import boto3
import os
import base64


def decrypt_sec_key_with_kms_key(sec_key):
    kms = boto3.client('kms')
    response = kms.decrypt(CiphertextBlob=base64.b64decode(
        sec_key))    # b64 decode key before decrypting it

    decoded = base64.b64encode(response['Plaintext']).decode('utf-8')
    return decoded
