import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Link from "next/link";

import { axiosClient } from "@/helper/axios/axiosClient";
import { formattedMoney } from "@/helper/formatDocument";

import AccountLayout from "../layout";

function MyOrders() {
  const [order, setOrder] = useState([]);
  const getProfile = async () => {
    try {
      const res = await axiosClient.get("/authCustomers/profile");
      const userId = res.data.payload.id;
      const res2 = await axiosClient.get(`/orders/customer?customerId=${userId}`);
      setOrder(res2?.data?.payload);
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
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
      render: (text, record, id) => <Link href={`/account/my_orders/${record.id}`}>Order #{id + 1}</Link>,
    },
    {
      title: "Created Date",
      //   dataIndex: "age",
      key: "createdDate",
      render: (record) => new Date(record?.createdDate).toLocaleDateString("en-GB"),
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
        <span className={`inline-flex items-center rounded-md  px-2 py-1 text-xs ${renderStatus(record.status)}`}>
          {record.status}
        </span>
      ),

      //   key: "tags",
      //   dataIndex: "status",
    },
    {
      title: "Total",
      key: "totalPrice",
      render: (record) => formattedMoney(record?.totalPrice),
    },
    {
      title: "Shipping",
      key: "shippingFee",
      render: (record) => formattedMoney(record?.shippingFee),
    },
    {
      title: "Address",
      key: "shippingAddress",
      dataIndex: "shippingAddress",
      width: "20%",
    },
  ];
  return (
    <div className="w-full overflow-x-auto     flex flex-col items-start justify-center  max-w-[54.375rem]  flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
      {/* <span className="max-w-[9.6875rem] text-secondary-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]">
        Your Order
      </span> */}
      {order.length <= 0 && <p>You not have any order</p>}
      <Table rowKey="_id" style={{ width: "auto" }} columns={columns} dataSource={order} pagination={false} />
      {/* {order.map((item) => {
        return (
          <div key={item.id} className="flex gap-1 content-center justify-start">
            <div>{item.description}</div>
            <div>{new Date(item?.createdDate).toLocaleDateString("en-GB")}</div>
            <div>{new Date(item?.shippedDate).toLocaleDateString("en-GB")}</div>
            <div>{item?.status}</div>
          </div>
        );
      })} */}
    </div>
  );
}

export default MyOrders;
MyOrders.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};
