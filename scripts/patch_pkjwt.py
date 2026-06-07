import sys
ROOT="/root/colombo-poc/verifiably/verifiably-go/"
def rd(f): return open(ROOT+f).read()
def wr(f,s): open(ROOT+f,"w").write(s)
def repl(s, old, new, f):
    if old not in s: sys.exit("ANCHOR NOT FOUND in %s: %r"%(f, old[:70]))
    return s.replace(old, new, 1)
def repl_all(s, old, new):
    return s.replace(old, new)
def ins_after_all(s, anchor, lines):
    out=[]; n=0
    for ln in s.split("\n"):
        out.append(ln)
        if anchor in ln:
            ind=ln[:len(ln)-len(ln.lstrip())]
            for x in lines: out.append(ind+x)
            n+=1
    return "\n".join(out), n

# ---------------- oidc.go ----------------
f="internal/auth/oidc/oidc.go"; s=rd(f)
s=repl(s,
'\t"context"\n\t"crypto/rand"\n\t"crypto/sha256"\n\t"crypto/tls"\n\t"encoding/base64"\n\t"encoding/json"\n\t"fmt"\n',
'\t"context"\n\t"crypto"\n\t"crypto/rand"\n\t"crypto/rsa"\n\t"crypto/sha256"\n\t"crypto/tls"\n\t"crypto/x509"\n\t"encoding/base64"\n\t"encoding/json"\n\t"encoding/pem"\n\t"fmt"\n', f)
s,_=ins_after_all(s, "\tClientSecret string",
 ["", "\t// ClientAuthMethod: \"client_secret\" (default) or \"private_key_jwt\".",
  "\tClientAuthMethod string",
  "\t// PrivateKeyPEM signs the private_key_jwt client_assertion (PKCS1/PKCS8 PEM).",
  "\tPrivateKeyPEM string",
  "\t// KeyID is the JWS \"kid\" on the client_assertion.",
  "\tKeyID string"])
s=repl_all(s,
'\tif p.cfg.ClientSecret != "" {\n\t\tform.Set("client_secret", p.cfg.ClientSecret)\n\t}',
'\tif err := p.setClientAuth(form, m.TokenEndpoint); err != nil {\n\t\treturn auth.Token{}, err\n\t}')
HELPERS=r"""// setClientAuth adds client authentication to a token-endpoint form: a
// signed private_key_jwt client_assertion when configured, else a
// client_secret when present.
func (p *Provider) setClientAuth(form url.Values, tokenEndpoint string) error {
	if strings.EqualFold(p.cfg.ClientAuthMethod, "private_key_jwt") {
		assertion, err := p.clientAssertion(tokenEndpoint)
		if err != nil {
			return err
		}
		form.Set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer")
		form.Set("client_assertion", assertion)
		return nil
	}
	if p.cfg.ClientSecret != "" {
		form.Set("client_secret", p.cfg.ClientSecret)
	}
	return nil
}

// clientAssertion builds an RS256-signed JWT (RFC 7523) for private_key_jwt
// token-endpoint authentication, e.g. against eSignet/MOSIP.
func (p *Provider) clientAssertion(audience string) (string, error) {
	block, _ := pem.Decode([]byte(p.cfg.PrivateKeyPEM))
	if block == nil {
		return "", fmt.Errorf("private_key_jwt: no PEM block in private key")
	}
	var key *rsa.PrivateKey
	if k, err := x509.ParsePKCS8PrivateKey(block.Bytes); err == nil {
		rk, ok := k.(*rsa.PrivateKey)
		if !ok {
			return "", fmt.Errorf("private_key_jwt: PKCS8 key is not RSA")
		}
		key = rk
	} else if k, err := x509.ParsePKCS1PrivateKey(block.Bytes); err == nil {
		key = k
	} else {
		return "", fmt.Errorf("private_key_jwt: cannot parse RSA private key (PKCS1/PKCS8 PEM)")
	}
	now := time.Now()
	jti := make([]byte, 16)
	_, _ = rand.Read(jti)
	header := map[string]string{"alg": "RS256", "typ": "JWT"}
	if p.cfg.KeyID != "" {
		header["kid"] = p.cfg.KeyID
	}
	claims := map[string]interface{}{
		"iss": p.cfg.ClientID,
		"sub": p.cfg.ClientID,
		"aud": audience,
		"jti": base64.RawURLEncoding.EncodeToString(jti),
		"iat": now.Unix(),
		"exp": now.Add(5 * time.Minute).Unix(),
	}
	hb, _ := json.Marshal(header)
	cb, _ := json.Marshal(claims)
	signingInput := base64.RawURLEncoding.EncodeToString(hb) + "." + base64.RawURLEncoding.EncodeToString(cb)
	digest := sha256.Sum256([]byte(signingInput))
	sig, err := rsa.SignPKCS1v15(rand.Reader, key, crypto.SHA256, digest[:])
	if err != nil {
		return "", fmt.Errorf("private_key_jwt: sign: %w", err)
	}
	return signingInput + "." + base64.RawURLEncoding.EncodeToString(sig), nil
}

"""
s=repl(s, "// Refresh swaps a refresh token for a new access token.", HELPERS+"// Refresh swaps a refresh token for a new access token.", f)
wr(f,s); print("patched", f)

# ---------------- providers.go ----------------
f="internal/auth/providers.go"; s=rd(f)
s,n=ins_after_all(s, 'ClientSecret       string   `json:"clientSecret,omitempty"`',
 ['ClientAuthMethod   string   `json:"clientAuthMethod,omitempty"`',
  'PrivateKeyPEM      string   `json:"privateKeyPem,omitempty"`',
  'KeyID              string   `json:"keyId,omitempty"`'])
print("providers.go ProviderConfig inserts:", n); wr(f,s)

# ---------------- handlers.go ----------------
f="internal/handlers/handlers.go"; s=rd(f)
s,n=ins_after_all(s, "\tClientSecret       string\n", [])  # noop guard
s=repl(s, "\tClientSecret       string\n\tScopes             []string\n\tInsecureSkipVerify bool",
 "\tClientSecret       string\n\tClientAuthMethod   string\n\tPrivateKeyPEM      string\n\tKeyID              string\n\tScopes             []string\n\tInsecureSkipVerify bool", f)
s=repl(s, '\tclientSecret := strings.TrimSpace(r.FormValue("client_secret"))\n',
 '\tclientSecret := strings.TrimSpace(r.FormValue("client_secret"))\n\tauthMethod := strings.TrimSpace(r.FormValue("client_auth_method"))\n\tprivateKeyPEM := strings.TrimSpace(r.FormValue("private_key_pem"))\n\tkeyID := strings.TrimSpace(r.FormValue("key_id"))\n', f)
s,n=ins_after_all(s, "ClientSecret:       clientSecret,",
 ["ClientAuthMethod:   authMethod,", "PrivateKeyPEM:      privateKeyPEM,", "KeyID:              keyID,"])
print("handlers.go clientSecret-build inserts:", n); wr(f,s)

# ---------------- cmd/server/auth.go ----------------
f="cmd/server/auth.go"; s=rd(f)
s,a=ins_after_all(s, "ClientSecret:       c.ClientSecret,",
 ["ClientAuthMethod:   c.ClientAuthMethod,", "PrivateKeyPEM:      c.PrivateKeyPEM,", "KeyID:              c.KeyID,"])
s,b=ins_after_all(s, "ClientSecret:       in.ClientSecret,",
 ["ClientAuthMethod:   in.ClientAuthMethod,", "PrivateKeyPEM:      in.PrivateKeyPEM,", "KeyID:              in.KeyID,"])
print("auth.go inserts c=%d in=%d"%(a,b)); wr(f,s)

# ---------------- auth.html ----------------
f="templates/pages/auth.html"; s=rd(f)
old='  <label style="display:flex;flex-direction:column;gap:0.25rem">\n    <span class="caps" style="font-size:0.65rem">Scopes (comma-separated, defaults to openid,profile,email)</span>'
new='''  <label style="display:flex;flex-direction:column;gap:0.25rem">
    <span class="caps" style="font-size:0.65rem">Client auth method</span>
    <select name="client_auth_method" style="padding:0.4rem;border:1px solid var(--line);background:var(--bg);color:var(--ink)">
      <option value="client_secret">client_secret (default)</option>
      <option value="private_key_jwt">private_key_jwt (eSignet/MOSIP)</option>
    </select>
  </label>
  <label style="display:flex;flex-direction:column;gap:0.25rem">
    <span class="caps" style="font-size:0.65rem">Private key PEM (private_key_jwt only)</span>
    <textarea name="private_key_pem" rows="4" placeholder="-----BEGIN PRIVATE KEY-----"
              style="padding:0.4rem;border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:var(--mono)"></textarea>
  </label>
  <label style="display:flex;flex-direction:column;gap:0.25rem">
    <span class="caps" style="font-size:0.65rem">Key ID / kid (private_key_jwt only)</span>
    <input type="text" name="key_id"
           style="padding:0.4rem;border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:var(--mono)">
  </label>
  <label style="display:flex;flex-direction:column;gap:0.25rem">
    <span class="caps" style="font-size:0.65rem">Scopes (comma-separated, defaults to openid,profile,email)</span>'''
s=repl(s, old, new, f); wr(f,s); print("patched", f)
print("ALL PATCHES APPLIED")
