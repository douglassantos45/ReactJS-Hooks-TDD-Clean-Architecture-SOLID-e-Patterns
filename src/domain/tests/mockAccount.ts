import { AuthenticationParams } from "@/domain/useCases";

import faker from "faker";
import { AccountModel } from "../models";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = ():AccountModel => ({
  accessToken: faker.random.uuid()
})
