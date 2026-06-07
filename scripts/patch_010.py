f="/root/colombo-poc/_esignet-src/mock-0.10.x/mock-identity-system/src/main/java/io/mosip/esignet/mock/identitysystem/service/impl/IdentityServiceImpl.java"
src=open(f).read()
import re
NEW = r'''	@Override
	public JsonNode getIdentityV2(String individualId) throws MockIdentityException {
		try {
			String sunbirdUrl = System.getenv().getOrDefault("SUNBIRD_REGISTRY_URL", "http://156.67.105.185:18091");
			String entity = System.getenv().getOrDefault("SUNBIRD_ENTITY", "Person");
			com.fasterxml.jackson.databind.node.ObjectNode eq = objectMapper.createObjectNode();
			eq.put("eq", individualId);
			com.fasterxml.jackson.databind.node.ObjectNode nid = objectMapper.createObjectNode();
			nid.set("nationalId", eq);
			com.fasterxml.jackson.databind.node.ObjectNode filter = objectMapper.createObjectNode();
			filter.set("filters", nid);
			java.net.http.HttpClient client = java.net.http.HttpClient.newBuilder().connectTimeout(java.time.Duration.ofSeconds(8)).build();
			java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
				.uri(java.net.URI.create(sunbirdUrl + "/api/v1/" + entity + "/search"))
				.header("Content-Type", "application/json")
				.timeout(java.time.Duration.ofSeconds(10))
				.POST(java.net.http.HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(filter)))
				.build();
			java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
			JsonNode root = objectMapper.readTree(response.body());
			JsonNode rows = root.isArray() ? root : root.path("data");
			if (rows == null || !rows.isArray() || rows.size() == 0) {
				throw new MockIdentityException(ErrorConstants.INVALID_INDIVIDUAL_ID);
			}
			JsonNode p = rows.get(0);
			com.fasterxml.jackson.databind.node.ObjectNode out = objectMapper.createObjectNode();
			out.put("individualId", individualId);
			out.put("pin", mockText(p, "pin"));
			out.put("password", mockText(p, "pin"));
			out.set("fullName", mockMl(mockText(p, "fullName")));
			out.set("givenName", mockMl(mockText(p, "givenName")));
			out.set("middleName", mockMl(mockText(p, "middleName")));
			out.set("familyName", mockMl(mockText(p, "familyName")));
			out.set("nickName", mockMl(mockText(p, "givenName")));
			out.set("preferredUsername", mockMl(mockText(p, "givenName")));
			out.set("gender", mockMl(mockText(p, "gender")));
			out.put("dateOfBirth", mockText(p, "dateOfBirth"));
			out.put("email", mockText(p, "email"));
			out.put("phone", mockText(p, "phone"));
			out.set("streetAddress", mockMl(mockText(p, "streetAddress")));
			out.set("locality", mockMl(mockText(p, "locality")));
			out.set("region", mockMl(mockText(p, "region")));
			out.put("postalCode", mockText(p, "postalCode"));
			out.set("country", mockMl(mockText(p, "country")));
			out.put("preferredLang", "eng");
			out.put("locale", "en-US");
			out.put("zoneInfo", "Asia/Colombo");
			out.put("encodedPhoto", "");
			return out;
		} catch (MockIdentityException e) {
			throw e;
		} catch (Exception e) {
			throw new MockIdentityException(ErrorConstants.INVALID_INDIVIDUAL_ID);
		}
	}

	private com.fasterxml.jackson.databind.JsonNode mockMl(String v) {
		com.fasterxml.jackson.databind.node.ArrayNode a = objectMapper.createArrayNode();
		com.fasterxml.jackson.databind.node.ObjectNode o = objectMapper.createObjectNode();
		o.put("language", "eng");
		o.put("value", v == null ? "" : v);
		a.add(o);
		return a;
	}

	private String mockText(com.fasterxml.jackson.databind.JsonNode n, String fld) {
		com.fasterxml.jackson.databind.JsonNode v = n.get(fld);
		return (v == null || v.isNull()) ? "" : v.asText();
	}'''
m=re.search(r'[ \t]*@Override\n[ \t]*public JsonNode getIdentityV2\(String individualId\)[^\n]*\{', src)
assert m, "getIdentityV2 not found"
start=m.start(); i=m.end()-1; depth=0
while i < len(src):
    c=src[i]
    if c=="{": depth+=1
    elif c=="}":
        depth-=1
        if depth==0: break
    i+=1
end=i+1
open(f,"w").write(src[:start]+NEW+src[end:])
print("patched getIdentityV2; replaced", end-start, "chars")
