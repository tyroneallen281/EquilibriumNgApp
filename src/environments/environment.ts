
export const environment = {
  production: false,
    API_BASE_PATH: 'https://manage.eqapp.net/eq.api',
    AUTH_API_BASE_PATH: 'https://manage.eqapp.net/AuthService',
};


/*
API Gen
 java -jar swagger-codegen-cli.jar generate -i https://manage.eqapp.net/eq.api/swagger/v1/swagger.json -l typescript-angular -o RXITMEClientApi --additional-properties npmName=@angular-baobab/rx-client-api,snapshot=true,ngVersion=6.0.0

*/
