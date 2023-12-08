import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Pagination, Select, Space } from "antd";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import HeadMeta from "@/components/HeadMeta";
import ProductItemComponent from "@/components/productItemComponent";
import Loading from "@/components/svg/loading";
import Rectangle from "@/components/svg/rectangle";

// import ProductItemComponent from "@/components/productItemComponent";
import { axiosClient } from "@/helper/axios/axiosClient";

const CheckboxGroup = Checkbox.Group;
// const plainOptions = ['Hàng mới', 'Flash sale', 'Giảm giá'];
const plainOptions = ["New", "Flash sale", "Sale"];
function Product(props) {
  const { product, category, supplier } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [productList, setProductList] = useState(product.payload);
  // Checkbox
  const [filter, setFilter] = useState({ isChanged: false });
  const [checkedList, setCheckedList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setsupplierList] = useState([]);
  const [total, setTotal] = useState(product.total);
  const onChange = (list) => {
    setCheckedList(list);
  };
  const handleFilter = useCallback(async () => {
    // const test = `products?${filter?.categoryId ? `categoryId=${filter.categoryId}&` : ""}${
    //   filter?.supplierId ? `supplierId=${filter.supplierId}` : ""
    // }`;
    // console.log("◀◀◀ test ▶▶▶", test);
    try {
      setLoading(true);

      const result = await axiosClient.get(
        `products?${filter?.categoryId ? `categoryId=${filter.categoryId}&` : ""}${
          filter?.supplierId ? `supplierId=${filter.supplierId}` : ""
        }${filter?.startPrice ? `&startPrice=${filter.startPrice}` : ""}${
          filter?.endPrice ? `&endPrice=${filter.endPrice}` : ""
        }`,
      );
      setProductList(result.data.payload);
      setTotal(result.data.total);
      // console.log("◀◀◀ result ▶▶▶", result);
      setLoading(false);
      setFilter((prev) => ({
        ...prev,
        isChanged: false,
      }));
    } catch (error) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log("◀◀◀ error ▶▶▶", error);
    }
  }, [filter]);
  const handleChangeCategory = useCallback(
    async (id) => {
      setFilter((prev) => ({
        ...prev,
        categoryId: id,
        isChanged: true,
      }));
      // eslint-disable-next-line no-console
      console.log("◀◀◀ filter ▶▶▶", filter);
      // try {
      //   setLoading(true);
      //   const result = await axiosClient.get(`products?categoryId=${id}`);
      //   setProductList(result.data.payload);
      //   console.log("◀◀◀ result ▶▶▶", result);
      //   setLoading(false);
      // } catch (error) {
      //   console.log("◀◀◀ error ▶▶▶", error);
      // }
    },
    [filter],
  );
  const handleChangeSupplier = useCallback(
    async (id) => {
      setFilter((prev) => ({
        ...prev,
        supplierId: id,
        isChanged: true,
      }));
      // try {
      //   setLoading(true);
      //   const result = await axiosClient.get(`products?supplierId=${e}`);
      //   setProductList(result.data.payload);
      //   console.log("◀◀◀ result ▶▶▶", result);
      //   setLoading(false);
      // } catch (error) {
      //   console.log("◀◀◀ error ▶▶▶", error);
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter],
  );
  const handleChangePrice = useCallback(
    async (item) => {
      if (!item.endPrice) {
        setFilter((prev) => ({
          ...prev,
          startPrice: item.startPrice,
          endPrice: null,
          isChanged: true,
        }));
      } else {
        setFilter((prev) => ({
          ...prev,
          startPrice: item.startPrice,
          endPrice: item.endPrice,
          isChanged: true,
        }));
      }
      // setFilter((prev) => ({
      //   ...prev,
      //   supplierId: id,
      //   isChanged: true,
      // }));
      // try {
      //   setLoading(true);
      //   const result = await axiosClient.get(`products?supplierId=${e}`);
      //   setProductList(result.data.payload);
      //   console.log("◀◀◀ result ▶▶▶", result);
      //   setLoading(false);
      // } catch (error) {
      //   console.log("◀◀◀ error ▶▶▶", error);
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter],
  );
  useEffect(() => {
    const newList = category.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    const newListSuplier = supplier.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setCategoryList(newList);
    setsupplierList(newListSuplier);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onShowSizeChange = (current, pageSize) => {
    router.push(`/product?page=${current}&pageSize=${pageSize}`);
  };
  useEffect(() => {
    setProductList(product.payload);
  }, [product]);
  return (
    <>
      <HeadMeta title="Products Page" />

      <div className="container bg-[#F3F3F3] pt-[1rem] pb-[4.25rem] my-[4.38rem] rounded-[0.25rem]">
        <div className="sm:flex items-end mb-[1rem] xs:mb-[1rem]">
          <div className="sm:flex max-h-[6.4375rem] flex-col items-start gap-[1.25rem]">
            <div className="flex items-center gap-[1rem]">
              <div className="min-w-[1.25rem] min-h-[2.5rem]">
                <Rectangle />
              </div>
              <h3 className="text-secondary-2 font-inter text-[1rem] font-[600] leading-[1.25rem]">Products</h3>
            </div>
          </div>
        </div>
        <div className=" my-0">
          <Space wrap>
            <span>Filter</span>
            <Select
              defaultValue="Category"
              style={{
                width: "8rem",
              }}
              // onChange={handleChange}
              options={categoryList}
              onChange={(e) => handleChangeCategory(e)}
            />

            <Select
              defaultValue="Price"
              style={{
                width: 140,
              }}
              onChange={(id, item) => handleChangePrice(item)}
              options={[
                {
                  value: "1",
                  startPrice: 0,
                  endPrice: 100,
                  label: "$0-$100",
                },
                {
                  value: "2",
                  startPrice: 100,
                  endPrice: 500,
                  label: "$100-$500",
                },
                {
                  value: "3",
                  startPrice: 500,
                  endPrice: 1000,
                  label: "$500-$1000",
                },
                {
                  value: "4",
                  startPrice: 1000,
                  endPrice: 5000,
                  label: "$1000-$5000",
                },
                {
                  value: "5",
                  startPrice: 5000,
                  label: "$5000 - Max",
                },
              ]}
            />
            <Select
              defaultValue="Supplier"
              style={{
                width: "12rem",
              }}
              // onChange={handleChange}
              options={supplierList}
              onChange={(e) => handleChangeSupplier(e)}
            />
            {filter?.isChanged === true ? (
              <Button type="primary" onClick={() => handleFilter()} danger>
                Apply
              </Button>
            ) : (
              ""
            )}
            {filter?.isChanged === true && (filter?.categoryId || filter.supplierId) ? (
              <Button
                type="text"
                onClick={() => {
                  setFilter({ isChanged: true });
                }}
                danger
              >
                Clear
              </Button>
            ) : (
              ""
            )}
          </Space>
          <div className="d-flex justify-content-start align-items-center mt-3 gap-3">
            <span>
              <b>{total}</b> Result
            </span>
            {productList?.length > 0 && (
              <div>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} className="my-2" />
                {checkedList.length > 0 ? (
                  <Button type="text" danger onClick={() => setCheckedList([])}>
                    Clear all
                  </Button>
                ) : null}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!loading ? (
              productList.map((item) => {
                return <ProductItemComponent key={item.id} product={item} />;
              })
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-[2rem]">
          <Pagination
            showSizeChanger
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={product.total}
          />
        </div>
        {/* <CategoriesCarousel categories={categories} /> */}
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
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { page, pageSize } = context.query;
  const res = await axiosClient.get(`/products?page=${page || 1}&pageSize=${pageSize || 10}`);
  const categoryResult = await axiosClient.get("/categories");
  const supplierResult = await axiosClient.get("/suppliers");
  const data = await res.data;

  // Pass data to the page via props
  return { props: { product: data, category: categoryResult.data.payload, supplier: supplierResult.data.payload } };
}
