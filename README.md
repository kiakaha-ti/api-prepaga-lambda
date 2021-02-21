# api-prepaga-lambda

Project lambda

# Commands

sam build --> Start build <br>
sam deploy --> Push the new lambda in AWS using cloudformation <br>
sam local invoke "ApiPrepaga" -e ./events/inmmediate.json --env-vars .env.json --> Invoke lambda locally for test 

# Credentials

export AWS_ACCESS_KEY_ID=<ACCESS_KEY><br>
export AWS_SECRET_ACCESS_KEY=<ACCESS_SECRET><br>
export AWS_DEFAULT_REGION=sa-east-1

