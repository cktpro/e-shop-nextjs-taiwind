/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Link from "next/link";

import Loading from "@/components/svg/loading";

import { axiosClient } from "@/helper/axios/axiosClient";
import { formattedMoney } from "@/helper/formatDocument";

import AccountLayout from "../layout";

function MyOrders() {
  const [order, setOrder] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    try {
      setIsLoading(true);

      const res = await axiosClient.get("/authCustomers/profile");
      const userId = res.data.payload.id;
      const res2 = await axiosClient.get(`/orders/customer?customerId=${userId}`);
      setOrder(res2?.data?.payload);

      setIsLoading(false);
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      setIsLoading(false);
    }
  };
  const renderStatus = (status) => {
    switch (status.toString()) {
      case "WAITING":
        return "bg-yellow-200";
      case "COMPLETED":
        return "bg-green-200";
      case "REJECT":
        return "bg-red-200";
      case "CANCELED":
        return "bg-gred-200";
      case "DELIVERING":
        return "bg-blue-200";
      default:
        return "bg-gray-200";
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const columns = [
    {
      title: "ID",
      //   dataIndex: "_id",
      key: "_id",
      render: (text, record, id) => (
        <Link
          className="font-inter text-[1rem] text-text-2 font-[500] leading-[1rem]"
          href={`/account/my_orders/${record.id}`}
        >
          Order #{id + 1}
        </Link>
      ),
    },
    {
      title: "Created Date",
      //   dataIndex: "age",
      key: "createdDate",
      render: (record) => (
        <span className="font-inter text-[1rem] text-text-2 font-[400] leading-[1rem]">
          {new Date(record?.createdDate).toLocaleDateString("en-GB")}
        </span>
      ),
    },
    // {
    //   title: "Shipped Date",
    //   key: "createdDate",
    //   render: (record) => new Date(record?.shippedDate).toLocaleDateString("en-GB"),

    //   //   dataIndex: "address",
    //   //   key: "address",
    // },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <span
          className={`font-inter text-[1rem] text-text-2 font-[400] leading-[1rem] inline-flex items-center rounded-md px-2 py-1 ${renderStatus(
            record.status,
          )}`}
        >
          {record.status}
        </span>
      ),

      //   key: "tags",
      //   dataIndex: "status",
    },
    {
      title: "Total",
      key: "totalPrice",
      render: (record) => (
        <span className="font-inter text-[1rem] text-text-2 font-[400] leading-[1rem]">
          {formattedMoney(parseFloat(record?.totalPrice) + parseFloat(record?.shippingFee))}
        </span>
      ),
    },
    {
      title: "Shipping",
      key: "shippingFee",
      render: (record) => (
        <span className="font-inter text-[1rem] text-text-2 font-[400] leading-[1rem]">
          {formattedMoney(record?.shippingFee)}
        </span>
      ),
    },
    {
      title: "Address",
      key: "shippingAddress",
      dataIndex: "shippingAddress",
      width: "20%",
      render: (text) => <span className="font-inter text-[1rem] text-text-2 font-[400] leading-[1rem]">{text}</span>,
    },
  ];
  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.3)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
          <Loading />
        </div>
      )}

      <div className="cover_order w-full overflow-x-auto flex flex-col items-start justify-center  max-w-[54.375rem]  flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
        {/* <span className="max-w-[9.6875rem] text-secondary-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]">
        Your Order
      </span> */}
        {order.length <= 0 && <p>You not have any order</p>}
        <Table
          scroll={{
            y: 450,
            x: 650,
          }}
          rowKey="_id"
          style={{ width: "auto" }}
          columns={columns}
          dataSource={order}
          pagination={false}
        />
      </div>
    </>
  );
}

export default MyOrders;
MyOrders.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};
