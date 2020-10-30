import { getProductById } from "../handler";
import { productList } from "../mock/productsMock";

it("getProductById should return status 404 and error if product wasnt found", async () => {
  const notExistedId = "notExistedId";
  const responce: any = await getProductById(
    { pathParameters: { id: notExistedId } } as any,
    {} as any,
    {} as any
  );

  expect(responce.statusCode).toBe(404);
  expect(responce.body).toBeTruthy();
});

it("getProductById should return status 200 and data if product was found", async () => {
  const realId = productList[0].id;
  const responce: any = await getProductById(
    { pathParameters: { id: realId } } as any,
    {} as any,
    {} as any
  );

  expect(responce.statusCode).toBe(200);
  expect(responce.body).toBeTruthy();
});
