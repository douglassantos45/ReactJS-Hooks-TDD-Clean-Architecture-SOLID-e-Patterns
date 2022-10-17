import { HttpPostParams } from "@/dataLayer/protocols/http";
import faker from "faker";

import { AxiosHttpClient } from "./axiosHttpClient";
import { mockAxios } from "@/infra/http/tests";
import axios from "axios";
import { mockPostRequest } from "@/dataLayer/tests";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSystemUderTest = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};


describe("AxiosHttpClient", () => {
  test("should call axios with correct URL, body and verb", async () => {
    const request = mockPostRequest();

    const { sut, mockedAxios } = makeSystemUderTest();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("should call axios with correct statusCde and body", async () => {
    const { sut, mockedAxios } = makeSystemUderTest();
    const promise = sut.post(mockPostRequest());

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value); //[0] resolve value
  });
});
