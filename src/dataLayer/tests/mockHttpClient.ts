import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from "@/dataLayer/protocols/http";

//Capturando variáveis de auxilio para testar os valores
export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  //Criando uma resposta padrão
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
