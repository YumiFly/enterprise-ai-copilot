import io
from fastapi import HTTPException
import os
from google.cloud import storage

GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")

def get_storage_client():
    return storage.Client()

def upload_to_gcs(local_path: str, remote_path: str) -> str:
    """
    上传本地文件到 GCS 并返回公开访问链接。
    local_path: 本地文件路径
    remote_path: GCS 中的路径（如 reports/report_1234.docx）
    """
    client = get_storage_client()
    bucket = client.bucket(GCS_BUCKET_NAME)
    blob = bucket.blob(remote_path)
    blob.upload_from_filename(local_path)
    blob.make_public()  # 或使用 signed URL 更安全
    return blob.public_url



def download_from_gcs(remote_path: str) -> io.BytesIO:
    """
    从 GCS 下载文件并返回 BytesIO 流。
    remote_path: GCS 中的路径（如 reports/report_1234.docx）
    """
    client = get_storage_client()
    bucket = client.bucket(GCS_BUCKET_NAME)
    blob = bucket.blob(remote_path)

    if not blob.exists():
        raise FileNotFoundError(f"GCS 文件不存在: {remote_path}")

    byte_stream = io.BytesIO()
    blob.download_to_file(byte_stream)
    byte_stream.seek(0)
    return byte_stream