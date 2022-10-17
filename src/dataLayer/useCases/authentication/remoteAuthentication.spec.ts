import faker from "faker";
import {
  mockAccountModel,
  mockAuthentication,
} from "@/domain/tests/mockAccount";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { RemoteAuthentication } from "./remoteAuthentication";
import { HttpStatusCode } from "@/dataLayer/protocols/http";
import { AuthenticationParams } from "@/domain/useCases";
import { HttpPostClientSpy } from "@/dataLayer/tests";
import { AccountModel } from "@/domain/models";

type SutTypes = {
  systemUnderTest: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

//usando Factory para realizar os testes
const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    systemUnderTest,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("should call HttpPostCLient with correct URL", async () => {
    const url = faker.internet.url();
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest(url);

    await systemUnderTest.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("should call HttpPostCLient with correct body", async () => {
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest();

    const authenticationParams = mockAuthentication();

    await systemUnderTest.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("should return an AccountModel if HttpPostCLient returns 200", async () => {
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest();
    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await systemUnderTest.auth(mockAuthentication());
    expect(account).toBe(httpResult);
  });

  test("should throw UnexpectedError if HttpPostCLient returns 400", async () => {
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = systemUnderTest.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw InvalidCredentialsError if HttpPostCLient returns 401", async () => {
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = systemUnderTest.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError()); //Esperando um erro da promise
  });

  test("should throw UnexpectedError if HttpPostCLient returns 404", async () => {
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = systemUnderTest.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpPostCLient returns 500", async () => {
    const { systemUnderTest, httpPostClientSpy } = makeSystemUnderTest();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = systemUnderTest.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
