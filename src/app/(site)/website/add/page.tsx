'use client';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import ImageUploader from './ImageUploader';
import ImageUploaderCrop from './ImageUploaderCrop';
import WebsiteService from '@/services/website';
import toast from 'react-hot-toast';

const LANGS = ['en', 'sq'];

const AddNewPage = () => {
  const [activeTab, setActiveTab] = useState('en');
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [coverImage, setCoverImage] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');
  const [editorValue, setEditorValue] = useState<any>({
    en: {}, sq: {}
  });

  const initialPage = {
    slug: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    title: '',
    description: '',
    section1: { title: '', description: '', image: null, alt: '' },
    section2: { title: '', description: '', image: null, alt: '' },
    section3: { title: '', description: '', image: null, alt: '' }
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

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate(
      'slug',
      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-')
    );
  };

  const getCategories = async () => {
    const res: any = await WebsiteService.getPageGroups({ no_pagination: 1 });
    setCategoriesList(res?.data?.data || []);
  };

  const publishPage = async () => {
    try {
      const body = structuredClone(formData);
      body.group_id = selectedGroup;
      if (coverImage) body.cover_photo = coverImage;

      const res: any = await WebsiteService.createPage(body);
      if (res?.data?.success) {
        toast.success("SUCCESS")
       // router.push('/website/pages');
      }
    } catch (err: any) {
        toast.success(err?.response?.data?.message ?? "ERROR")
    }
  };

  useEffect(() => {
    getCategories();
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
        <h1 className="text-xl font-semibold">Add New Page</h1>
        <button
          onClick={publishPage}
          className="bg-dark text-white px-4 py-2"
        >
          Publish
        </button>
      </div>

      {/* Language Tabs */}
      <div className="flex gap-3 border-b">
        {LANGS.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-2 font-semibold ${
              activeTab === lang
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
            placeholder="Slug"
            value={formData[activeTab].slug}
            onChange={handleSlugChange}
          />

          <input
            className="w-full border px-3 py-2 font-bold"
            placeholder="Meta title (max 60)"
            maxLength={60}
            value={formData[activeTab].meta_title}
            onChange={(e) => handleUpdate('meta_title', e.target.value)}
          />

          <textarea
            className="w-full border px-3 py-2"
            rows={4}
            placeholder="Meta description"
            value={formData[activeTab].meta_description}
            onChange={(e) => handleUpdate('meta_description', e.target.value)}
          />

          <input
            className="w-full border px-3 py-2"
            placeholder="Type keyword & press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTag}
          />

          <div className="flex flex-wrap gap-2">
            {formData[activeTab].meta_keywords.map((tag: string) => (
              <span
                key={tag}
                onClick={() => handleDeleteTag(tag)}
                className="border px-3 py-1 cursor-pointer text-sm bg-white"
              >
                {tag} ✕
              </span>
            ))}
          </div>

          {/* Sections */}
          {[1, 2, 3].map((n) => (
            <div key={n} className="border p-4 space-y-3 bg-white">
              <h2 className="font-semibold">Section {n}</h2>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Title"
                value={formData[activeTab][`section${n}`].title}
                onChange={(e) =>
                  handleUpdate(`section${n}.title`, e.target.value)
                }
              />
              <RichTextEditor
                value={editorValue[activeTab]?.[`section${n}`]}
                setValue={(val: any) =>
                  setEditorValue((prev: any) => ({
                    ...prev,
                    [activeTab]: { ...prev[activeTab], [`section${n}`]: val }
                  }))
                }
                onBlur={() =>
                  handleUpdate(
                    `section${n}.description`,
                    editorValue[activeTab]?.[`section${n}`]
                  )
                }
              />
              <ImageUploader
                 path={`${activeTab}.section${n}.image`}
                    setImage={(img: any) =>
                    handleUpdate(`section${n}.image`, img)
                    }
              />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-4">
          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Cover Image</h3>
            <ImageUploaderCrop aspect={7 / 3} setImage={setCoverImage} />
          </div>

          <div className="border bg-white p-4">
            <h3 className="font-semibold mb-2">Categories</h3>
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
        </div>
      </div>
    </div>
  );
};

AddNewPage.Layout = 'authGuard';
export default AddNewPage;
