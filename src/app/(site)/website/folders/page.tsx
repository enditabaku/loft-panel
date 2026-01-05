'use client'
import * as React from 'react';
import WebsiteService from '@/services/website';
import toast from "react-hot-toast";

const WebsiteFolders = () => {
  const [errorCat, setErrorCat] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [catName, setCatName] = React.useState<any>({});
  const [data, setData] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [addNewCategory, setAddNewCategory] = React.useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const result: any = await WebsiteService.getPageGroups({
        page,
        page_size: rowsPerPage
      });
      setData(result?.data?.data || []);
      setTotal(result?.data?.meta?.total || 0);
      setErrorCat(null);
    } catch (e: any) {
      setErrorCat(e?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const submitCategory = async () => {
    setIsLoading(true);
    try {
      const result: any = await WebsiteService.createPageGroup(catName);
      if (result?.data?.success) {
        toast.success("Success!")
        getData();
        setAddNewCategory(false);
        setCatName({});
      }
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? "ERROR")
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setIsLoading(true);
    try {
      await WebsiteService.deletePageGroup(id);
      getData();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Website Public Pages Folders/Groups
        </h1>
        <button
          onClick={() => setAddNewCategory(true)}
          className="bg-black text-white px-4 py-2 text-sm"
        >
         Add New
        </button>
      </div>

      {errorCat && (
        <div className="border border-red-500 text-red-600 p-3 rounded">
          {errorCat}
        </div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="h-1 w-full bg-gray-200 overflow-hidden">
          <div className="h-full w-1/2 bg-orange-300 animate-pulse" />
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="flex gap-2">
            <input
              readOnly
              value={`EN: ${item.name_en} | AL: ${item.name_sq} | FR: ${item.name_fr} | IT: ${item.name_it} | ES: ${item.name_es}`}
              className="w-full border rounded-md px-3 py-2 bg-transparent text-sm"
            />
            <button
              onClick={() => deleteCategory(item.id)}
              className="border border-red-500 text-red-500 px-3 rounded-md"
            >
              DELETE
            </button>
          </div>
        ))}
      </div>

      {/* Empty */}
      {!data.length && (
        <div className="flex flex-col items-center mt-8 text-gray-500">
          <p className="mt-2">
            Oops! There's nothing here...
          </p>
        </div>
      )}

      {/* Pagination */}
      {total > rowsPerPage && (
        <div className="flex justify-between items-center text-sm mt-4">
          <select
            className="border px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 20, 50].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page * rowsPerPage >= total}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {addNewCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">Add new category</h2>

            {['en', 'sq'].map((lang) => (
              <input
                key={lang}
                placeholder={`Name (${lang.toUpperCase()})`}
                className="w-full border px-3 py-2"
                value={catName[`name_${lang}`] || ''}
                onChange={(e) =>
                  setCatName({ ...catName, [`name_${lang}`]: e.target.value })
                }
              />
            ))}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAddNewCategory(false)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>
              <button
                onClick={submitCategory}
                className="px-4 py-2 bg-dark text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

WebsiteFolders.Layout = 'authGuard';
export default WebsiteFolders;
