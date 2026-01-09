'use client';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/app/(site)/news/new/RichTextEditor';
import ImageUploader from '@/app/(site)/website/edit/ImageUploader';
import ImageUploaderCrop from '@/app/(site)/website/add/ImageUploaderCrop';
import ProjectsListService from '@/services/projects';
import ProjectsCategoryService from '@/services/projects/category';
import ProjectsTypeService from '@/services/projects/type';
import ClientService from '@/services/clients';
import PartnersService from '@/services/partners';
import toast from 'react-hot-toast';

const LANGS = ['en', 'sq'];

const AddNewProject = () => {
  const [activeTab, setActiveTab] = useState('en');
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [typeList, setTypeList] = useState<any[]>([]);
  const [clientList, setClientList] = useState<any[]>([]);
  const [partnerList, setPartnerList] = useState<any[]>([]);
  const [selectedOrientation, setSelectedOrientation] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [coverImage, setCoverImage] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [editorValue, setEditorValue] = useState<any>({
    en: {}, sq: {}
  });

  const initialPage = {
    name: '',
    description: ''
  };

  const [formData, setFormData] = useState<any>({
    cover_photo: null,
    en: structuredClone(initialPage),
    sq: structuredClone(initialPage)
  });

  const handleUpdate = (path: string, value: any, locale = activeTab) => {
    setFormData((prev: any) => {
      const clone = structuredClone(prev);
      const keys = path.split('.');
      let current = clone[locale];
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys.at(-1)!] = value;
      return clone;
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const tags = formData[activeTab].meta_keywords;
      if (!tags.includes(inputValue)) {
        handleUpdate('meta_keywords', [...tags, inputValue]);
      }
      setInputValue('');
    }
  };

  const handleDeleteTag = (tag: string) => {
    handleUpdate(
      'meta_keywords',
      formData[activeTab].meta_keywords.filter((t: string) => t !== tag)
    );
  };

  const getCategories = async () => {
    const res: any = await ProjectsCategoryService.getList({ no_pagination: 1 });
    setCategoriesList(res?.data?.data || []);
  };

  const getTypes = async () => {
    const res: any = await ProjectsTypeService.getList({ no_pagination: 1 });
    setTypeList(res?.data?.data || []);
  };

  const getClients = async () => {
    const res: any = await ClientService.getList({ no_pagination: 1 });
    setClientList(res?.data?.data || []);
  };

  const getPartners = async () => {
    const res: any = await PartnersService.getList({ no_pagination: 1 });
    setPartnerList(res?.data?.data || []);
  };


  const publishPage = async () => {
    try {
      const body = structuredClone(formData);
      body.group_id = selectedGroup;
      if (coverImage) body.cover_photo = coverImage;

      const res: any = await ProjectsListService.addProject(body);
      if (res?.data?.success) {
        toast.success("SUCCESS")
        // router.push('/projects/list');
      }
    } catch (err: any) {
      toast.success(err?.response?.data?.message ?? "ERROR")
    }
  };

  useEffect(() => {
    getCategories();
    getTypes();
    getClients();
    getPartners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Add New Project</h1>
        <button
          onClick={publishPage}
          className="bg-dark text-white px-4 py-2"
        >
          Submit
        </button>
      </div>

      {/* Language Tabs */}
      <div className="flex gap-3 border-b">
        {LANGS.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-2 font-semibold ${activeTab === lang
              ? 'border-b-2 border-orange-300 text-orange-300'
              : 'text-gray-400'
              }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main */}
        <div className="col-span-8 space-y-4">
          <input
            className="w-full border px-3 py-2 font-bold"
            placeholder="Project Name"
            value={formData[activeTab].name}
            onChange={(e) => handleUpdate('name', e.target.value)}
          />

          <textarea
            className="w-full border px-3 py-2"
            rows={4}
            placeholder="Description"
            value={formData[activeTab].description}
            onChange={(e) => handleUpdate('description', e.target.value)}
          />

          <input
            className="w-full border px-3 py-2"
            placeholder="Project Location"
            value={formData[activeTab].location}
            onChange={(e) => handleUpdate('location', e.target.value)}
          />

          <input
            className="w-full border px-3 py-2"
            placeholder="Project Status"
            value={formData[activeTab].status}
            onChange={(e) => handleUpdate('status', e.target.value)}
          />

          <div className="border p-4 space-y-3 bg-white">
            <label className="block mb-2">Content</label>
            <RichTextEditor
              value={formData.content}
              setValue={(e: any) => setFormData({ ...formData, content: e })}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-4">

          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Orientation</h3>
            {['vertical', 'horizontal'].map((or) => (
              <label key={or} className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={selectedOrientation === or}
                  onChange={() => setSelectedOrientation(or)}
                />
                {or}
              </label>
            ))}
          </div>

          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Cover Image</h3>
            <ImageUploaderCrop aspect={selectedOrientation == 'horizontal' ? 7 / 3 : 3 / 6} setImage={setCoverImage} />
          </div>

          <div className="border bg-white p-4">
            <input
              className="w-full border px-3 py-2"
              placeholder="Project Surface ex: 5km"
              value={formData.surface}
              onChange={(e) => handleUpdate('surface', e.target.value)}
            />
            <input
              className="w-full border px-3 py-2 mt-2"
              type={'number'}
              placeholder="Completion Year"
              value={formData.year}
              onChange={(e) => handleUpdate('year', e.target.value)}
            />
          </div>

          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Type</h3>
            {typeList.map((type) => (
              <label key={type.id} className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={selectedGroup === type.id}
                  onChange={() => setSelectedType(type.id)}
                />
                {type.name_en}
              </label>
            ))}
          </div>
          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Category</h3>
            {categoriesList.map((cat) => (
              <label key={cat.id} className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={selectedGroup === cat.id}
                  onChange={() => setSelectedGroup(cat.id)}
                />
                {cat.name_en}
              </label>
            ))}
          </div>
          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Client</h3>
            {clientList.map((cli) => (
              <label key={cli.id} className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={selectedGroup === cli.id}
                  onChange={() => setSelectedGroup(cli.id)}
                />
                {cli.name_en}
              </label>
            ))}
          </div>
          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Partner</h3>
            {partnerList.map((part) => (
              <label key={part.id} className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={selectedGroup === part.id}
                  onChange={() => setSelectedGroup(part.id)}
                />
                {part.name_en}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

AddNewProject.Layout = 'authGuard';
export default AddNewProject;
