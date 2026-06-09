FROM python:3.12-slim
RUN pip install --no-cache-dir fastapi "uvicorn[standard]"
WORKDIR /app
COPY registry_app.py .
EXPOSE 8000
CMD ["uvicorn", "registry_app:app", "--host", "0.0.0.0", "--port", "8000"]
