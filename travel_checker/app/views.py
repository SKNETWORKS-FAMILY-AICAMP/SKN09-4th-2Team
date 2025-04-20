from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import boto3
import os
from botocore.exceptions import ClientError

# Create your views here.
def index(request):
    return render(request, "app/index.html")

@csrf_exempt
def chat_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message", "")
        country = data.get("country", "")
        
        response = call_sagemaker_endpoint(user_message, country)
        return JsonResponse({
            'status': 'success',
            'response': response   
        })
    return JsonResponse({"error": "Invalid request method."}, status=400)

def call_sagemaker_endpoint(user_message, country):
    # Initialize the SageMaker runtime client
    sagemaker_runtime = boto3.client('sagemaker-runtime', region_name='ap-northeast-2')

    # Define the endpoint name
    endpoint_name = os.environ.get("SAGEMAKER_ENDPOINT_NAME")

    # Prepare the payload
    payload = {
        "user_message": user_message,
        "country": country
    }

    try:
        # Call the SageMaker endpoint
        response = sagemaker_runtime.invoke_endpoint(
            EndpointName=endpoint_name,
            ContentType='application/json',
            Body=json.dumps(payload)
        )

        # Read the response
        result = json.loads(response['Body'].read().decode())
        return result

    except ClientError as e:
        return {"error": str(e)}