"use client"
import React, { useState, useEffect } from "react";
// components
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/table";
import { Alert } from "@/components/alert";
// api
import MailSubscriptionService from "@/services/mail-subscription";

const tableHeader = [
  {
    accessorKey: "id",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Subscribed date",
    accessorKey: "subscribed_at",
  },
];

export default function MailSubscribe() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [meta, setMeta] = useState<any>({ total: 0, last_page: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getData(page: number = 1, page_size: number = 50) {
    setIsLoading(true)
    try {
      const body: any = {
        page,
        page_size
      }
      const result = await MailSubscriptionService.getList(body);
      if (result?.data?.success) {
        setData(result?.data?.data)
        setMeta({
          total: result?.data?.meta?.total,
          last_page: result?.data?.meta?.last_page,
        })
      } else {
        setError(result?.data?.message ?? "The list could not be fetched at the moment! Please try again!")
      }
    } catch (responseError: any) {
      setError(responseError?.response?.data?.message ?? "The list could not be fetched at the moment! Please try again!")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Breadcrumb pageName="Email Subscriptions" />

      <div className="grid grid-cols-1 gap-5 md:gap-7 2xl:gap-10">
        {error && (
          <Alert
            variant="error"
            title={error}
            description=""
          />
        )}
        <Table
          tableHeader={tableHeader}
          data={data ?? []}
          getData={getData}
          tableActions={[]}
          RenderTableHeader={() => (<></>)}
          hasPagination={true}
          meta={meta}
          loading={isLoading}
        />
      </div>
    </>
  );
}
