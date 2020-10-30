import getProducts from './getProducts'

it('getProducts should return status 200 and data if ptoduct list was received without error', async () => {
    const responce: any = await getProducts({} as any,{} as any, {} as any);

    expect(responce.statusCode).toBe(200);
    expect(responce.body).toBeTruthy();
});