export enum DatabaseConstantQueries {
    getAllProducts = "select p.*, s.count from product as p left join stocks as s on s.product_id = p.id",
    getProductById = "select p.*, s.count from product as p left join stocks as s on s.product_id = p.id where id ="
}

export const createProductQuery = (title, description, price) =>{
return `insert into product (title, description, price) values ('${title}' , '${description}', '${price}') returning *`
}

export const createCountQuery = (id, count) =>{
    return  `insert into stocks (product_id, count) values ('${id}' , '${count}') returning count`
    }