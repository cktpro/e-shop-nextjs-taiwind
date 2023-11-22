import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Select, Space } from "antd";
import PropTypes from "prop-types";

import HeadMeta from "@/components/HeadMeta";
import ProductItemComponent from "@/components/productItemComponent";

// import ProductItemComponent from "@/components/productItemComponent";
import { axiosClient } from "@/helper/axios/axiosClient";

const CheckboxGroup = Checkbox.Group;
// const plainOptions = ['Hàng mới', 'Flash sale', 'Giảm giá'];
const plainOptions = ["Hàng mới", "Flash sale", "Giảm giá"];
function Product(props) {
  const { product, category, supplier } = props;
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState(product);
  // Checkbox
  const [checkedList, setCheckedList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setsupplierList] = useState([]);
  const onChange = (list) => {
    console.log("◀◀◀ list ▶▶▶", list);
    setCheckedList(list);
  };
  const handleChangeCategory = useCallback(async (id) => {
    try {
      setLoading(true);
      const result = await axiosClient.get(`products?categoryId=${id}`);
      setProductList(result.data.payload);
      console.log("◀◀◀ result ▶▶▶", result);
      setLoading(false);
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
    }
  }, []);
  const handleChangeSupplier = useCallback(async (e) => {
    console.log("◀◀◀ id ▶▶▶", e);
    try {
      setLoading(true);
      const result = await axiosClient.get(`products?supplierId=${e}`);
      setProductList(result.data.payload);
      console.log("◀◀◀ result ▶▶▶", result);
      setLoading(false);
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
    }
  }, []);
  useEffect(() => {
    const newList = category.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    const newListSuplier = supplier.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setCategoryList(newList);
    setsupplierList(newListSuplier);
  }, []);
  return (
    <>
      <HeadMeta title="Trang sản phẩm" />
      <div className="container my-3">
        <Space wrap>
          <Select
            defaultValue="Loại sản phẩm"
            style={{
              width: "8rem",
            }}
            // onChange={handleChange}
            options={categoryList}
            onChange={(e) => handleChangeCategory(e)}
          />
          <Select
            defaultValue="Giá"
            style={{
              width: 120,
            }}
            options={[
              {
                value: "lucy",
                label: "$0-$1000",
              },
              {
                value: "lucy2",
                label: "$1000-$3000",
              },
            ]}
          />
          <Select
            defaultValue="Nhà cung cấp"
            style={{
              width: "auto",
            }}
            options={supplierList}
            onChange={(e) => handleChangeSupplier(e)}
          />
        </Space>
        <div className="d-flex justify-content-start align-items-center mt-3 gap-3">
          <span>{productList.length} Kết quả</span>
          <div>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} className="my-2" />
            {checkedList.length > 0 ? (
              <Button type="text" danger onClick={() => setCheckedList([])}>
                Clear all
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {!loading ? (
            productList.map((item) => {
              return <ProductItemComponent key={item.id} product={item} />;
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  category: PropTypes.instanceOf(Object).isRequired,
  supplier: PropTypes.instanceOf(Object).isRequired,
};
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axiosClient.get("/products");
  const categoryResult = await axiosClient.get("/categories");
  const supplierResult = await axiosClient.get("/suppliers");
  const data = await res.data.payload;

  // Pass data to the page via props
  return { props: { product: data, category: categoryResult.data.payload, supplier: supplierResult.data.payload } };
}
