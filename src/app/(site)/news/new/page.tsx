'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import BlogService from '@/services/blog';
import BlogCategoryService from '@/services/blog/category';
import RichTextEditor from './RichTextEditor';
import ImageUploader from './ImageUploader';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/constants/url';

const initialValues = {
  slug: "",
  title: "",
  description: "",
  content: "",
  author: "",
  language: "en",
  alt: null
};

const AddNewBlog = () => {
  const slug = "";

  const [formData, setFormData] = useState<any>(initialValues);
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const [coverImage, setCoverImage] = useState<any>(null);
  const [coverImageInitial, setCoverImageInitial] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags((prev) => [...prev, inputValue.trim()]);
      }
      setInputValue('');
    }
  };
  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
  };

  // 🔹 Categories
  const handleCategoryChange = (categoryId: number) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  // 🔹 Slug formatter
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slugValue = e.target.value;
    const formatted = slugValue
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-');
    setFormData({ ...formData, slug: formatted });
  };

  const handleCoverImageUpload = (item: any) => {
    setCoverImage(item);
  };

  function isValidHTML(str: string) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }

  async function getCategories() {
    try {
      const result: any = await BlogCategoryService.getList({ no_pagination: 1 });
      setCategoriesList(result?.data?.data);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  }

  async function getBlogDetails() {
    setLoading(true);
    try {
      const result: any = await BlogService.getDetails(String(slug));
      const blog = result?.data?.data[0];
      const safeContent = isValidHTML(blog?.content)
        ? blog?.content
        : `<p>${blog?.content}</p>`;

      setFormData({ ...blog, content: safeContent });
      setTags(blog?.tags || []);
      setCategories(blog?.category_ids?.map((c: any) => c.id) || []);
      setCoverImageInitial(blog.cover[0]?.path);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function publishBlog() {
    try {
      const body = {
        ...formData,
        tags,
        category_ids: categories
      };
      delete body.created_at;
      delete body.cover;

      if (coverImage) {
        body.image = [{ key: "cover", value: coverImage ?? coverImageInitial }];
      }
      if (!body.alt) delete body.alt;

      const result: any = slug
        ? await BlogService.updateArticle(body, formData.id)
        : await BlogService.addArticle(body);

      if (result?.data?.success) {
        toast.success("Article added successfully")
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "There was a problem trying to add the article. Please try again!")
    }
  }

  useEffect(() => { getCategories(); }, []);
  useEffect(() => { if (slug) getBlogDetails(); }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">
          {slug ? "Edit Article" : "Add New Article"}
        </h1>
        <button
          onClick={publishBlog}
          className="bg-dark hover:bg-dark text-white px-6 py-2"
        >
          {slug ? "Update" : "Publish"}
        </button>
      </div>
      <div className="bg-white p-6 mb-6">
        <h2 className="font-semibold mb-2">Language</h2>
        <div className="flex gap-4">
          {['en', 'sq', 'de', 'fr', 'es', 'ar'].map((lang) => (
            <label key={lang} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.language === lang}
                onChange={() => setFormData({ ...formData, language: lang })}
              />
              <span>{lang.toUpperCase()}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 space-y-4">
            <div>
              <label className="block font-semibold mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={handleSlugChange}
                placeholder="slug-format-with-hyphen"
                className="w-full border  px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Title (max 60 chars)</label>
              <input
                type="text"
                value={formData.title}
                maxLength={60}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border  px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Description (max 155 chars)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={155}
                rows={4}
                className="w-full border  px-3 py-2"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold mb-2">Content</label>
              <RichTextEditor
                value={formData.content}
                setValue={(e: any) => setFormData({ ...formData, content: e })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full border  px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Tags (keywords)</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type and press Enter"
                className="w-full border  px-3 py-2"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 border px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => handleDeleteTag(tag)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {slug && coverImageInitial && (
            <div className="bg-white p-6">
              <h2 className="font-semibold mb-2">Cover Image</h2>
              <Image
                src={`${BASE_URL}storage${coverImageInitial}`}
                alt="Cover"
                width={400}
                height={300}
                className=" object-cover"
              />
            </div>
          )}
          <div className="bg-white p-6 space-y-4">
            <h2 className="font-semibold mb-2">Add Cover Image</h2>
            <ImageUploader setImage={handleCoverImageUpload} aspect={4 / 3} />
            <div>
              <label className="block font-semibold mb-2">Alt Text (max 255 chars)</label>
              <input
                type="text"
                value={formData.alt || ""}
                maxLength={255}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                className="w-full border  px-3 py-2"
              />
            </div>
          </div>
          <div className="bg-white p-6">
            <h2 className="font-semibold mb-2">Categories</h2>
            <div className="flex flex-col gap-2">
              {categoriesList.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat.id)}
                    onChange={() => handleCategoryChange(cat.id)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddNewBlog.Layout = 'authGuard';
export default AddNewBlog;
