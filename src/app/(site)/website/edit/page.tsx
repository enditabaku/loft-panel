'use client';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import ImageUploader from './ImageUploader';
import WebsiteService from '@/services/website';
import toast from 'react-hot-toast';

type SectionData = {
    title: string,
    description: any,
    image: any,
    alt: string
}

type PageData = {
    slug: string,
    meta_title: string,
    meta_description: string,
    meta_keywords: string[],
    title: string,
    description: string,
    section1: SectionData,
    section2: SectionData,
    section3: SectionData,
}

type LanguagePageData = {
    en: PageData,
    sq: PageData,
    cover_photo: any
}

function a11yProps(val: string) {
    return {
        id: `vertical-tab-${val}`,
        'aria-controls': `vertical-tabpanel-${val}`
    };
}

const initialValues: PageData = {
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    title: "",
    description: "",
    section1: {
        title: "",
        description: "",
        image: null,
        alt: ""
    },
    section2: {
        title: "",
        description: "",
        image: null,
        alt: ""
    },
    section3: {
        title: "",
        description: "",
        image: null,
        alt: ""
    }
}

const editorInitialValues = {
    en: {
        section1: "",
        section2: "",
        section3: "",
    },
    sq: {
        section1: "",
        section2: "",
        section3: "",
    }
}

const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

const initialData: LanguagePageData = {
    cover_photo: null,
    en: clone(initialValues),
    sq: clone(initialValues)
}

const EditExistingPage = () => {
    const slug = "";
    const [formData, setFormData] = useState<any>(initialData)
    const [loading, setLoading] = useState<boolean>(false);
    const [categoriesList, setCategoriesList] = useState<string[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [coverImage, setCoverImage] = useState<any>(null);
    const [coverImageInitial, setCoverImageInitial] = useState<any>(null);
    const [inputValue, setInputValue] = useState('');

    const [editorValue, setEditorValue] = useState<any>(editorInitialValues);

    function handleUpdate(path: string, value: any) {
        setFormData((prev: any) => {
            const newData = { ...prev };

            const langObj = JSON.parse(JSON.stringify(newData));

            const keys = path.split(".");

            let current = langObj;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;

            return {
                ...newData,
                ...langObj, // update ONLY this language
            };
        });
    }

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            if (!formData.meta_keywords.includes(inputValue.trim())) {
                handleUpdate('meta_keywords', [...formData?.meta_keywords, inputValue.trim()])
            }
            setInputValue('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        const prevKeywords = formData.meta_keywords.filter((tag: string) => tag !== tagToDelete)
        setFormData({
            ...formData,
            meta_keywords: prevKeywords
        })
    };

    const handleCategoryChange = (category: string) => {
        setSelectedGroup(category);
    };

    const handleCoverImageUpload = (item: any) => {
        setCoverImage(item)
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const slugValue = e.target.value;
        const formattedSlug = slugValue
            .toLowerCase()                   // force lowercase
            .replace(/[^a-z0-9-]/g, '')      // remove invalid characters
            .replace(/--+/g, '-')            // replace multiple hyphens with one

        handleUpdate('slug', formattedSlug)
    };

    async function getCategories() {
        try {
            const result: any = await WebsiteService.getPageGroups({
                'no_pagination': 1
            });
            setCategoriesList(result?.data?.data)
        } catch (error: any) {
            console.log(error?.response?.data?.message)
        }
    }

    function isValidHTML(str: string) {
        const doc = new DOMParser().parseFromString(str, 'text/html');
        const hasHTMLTags = Array.from(doc.body.childNodes).some(
            node => node.nodeType === 1
        );
        return hasHTMLTags;
    }

    async function getPageDetails() {
        setLoading(true);
        try {
            const result: any = await WebsiteService.getPage(slug);
            const body = { ...result?.data?.data }
            body.sections?.map((item: any, index: number) => (
                body[`section${index + 1}`] = {
                    title: item.title,
                    alt: item.alt,
                    image: item.image_path,
                    description: isValidHTML(item?.description) ? item?.description : `<p>${item?.description}</p>`
                }
            ))
            delete body.sections;
            setFormData({
                ...body,
            });
            setSelectedGroup(result?.data?.data.website_page_group_id);
            setCoverImageInitial(result?.data?.data.cover_photo)
        } catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    function cleanImages(obj: any) {
        const prefixRegex = /^data:image\/\w+;base64,/;

        Object.keys(obj).forEach(sectionKey => {
            const section = obj[sectionKey];

            if (section.image && typeof section.image === "string") {
                section.image = section.image.replace(prefixRegex, "");
            }
        });

        return obj;
    }

    async function publishPage() {
        try {
            const body = cleanImages(formData);
            body.group_id = selectedGroup
            delete body.website_page_group_id
            delete body.locale
            delete body.section1.id
            if (coverImage) {
                body.cover_photo = coverImage ?? coverImageInitial
            }
            const result: any = await WebsiteService.updatePage(body, String(slug));
            if (result?.data?.success) {
                toast.success("SUCCESS")
                // router.push('/website/pages')
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? "error")
        }
    }

    const handleSectionImageUpload = (path: string, item: any) => {
        // .replace(/^data:image\/\w+;base64,/, "")
        handleUpdate(path, item)
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (slug) {
            getPageDetails();
        }
    }, [slug]);

    return (
        <div className="mx-8">
            {loading ? (
                <div className="flex justify-center my-8">
                    <div className="text-center mb-8">
                        {/* Tailwind Loading Spinner */}
                        <div className="w-[60px] h-[60px] border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header Section */}
                    <div className="flex flex-row justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">Edit Page</h1>
                        <div className="flex space-x-2">
                            <button
                                onClick={publishPage}
                                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        {/* Main content Area */}
                        <div className="col-span-12 md:col-span-8 space-y-6">

                            {/* Tabs Card */}
                            <div className="bg-white  shadow p-4">
                                <div className="flex border-b border-gray-200 overflow-x-auto">
                                    <button
                                        className={`px-6 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${formData?.locale
                                                ? 'border-orange-500 text-orange-500 bg-gray-50'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <span className="block text-xl font-bold">{formData?.locale?.toUpperCase()}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Form Content Card */}
                            <div className="bg-white  shadow p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold mb-1">Slug</label>
                                        <input
                                            type="text"
                                            placeholder="slug-format-with-hyphen"
                                            className="w-full p-2 border border-gray-300 font-extrabold focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={formData?.slug}
                                            onChange={handleSlugChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold mb-1">Add Meta Title: max 60 characters</label>
                                        <input
                                            type="text"
                                            maxLength={60}
                                            className="w-full p-2 border border-gray-300 font-extrabold focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={formData?.meta_title}
                                            onChange={(e) => handleUpdate('meta_title', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold mb-1">Add Meta Description (max 155 chars)</label>
                                    <textarea
                                        rows={5}
                                        maxLength={155}
                                        className="w-full p-2 border border-gray-300 font-extrabold focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formData?.meta_description}
                                        onChange={(e) => handleUpdate('meta_description', e.target.value)}
                                    />
                                </div>

                                {/* Keywords/Chips Section */}
                                <div>
                                    <label className="text-sm font-semibold mb-1 block">Add Meta Keywords</label>
                                    <input
                                        type="text"
                                        placeholder="Type and press Enter"
                                        className="w-full p-2 border border-gray-300 font-extrabold focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleAddTag}
                                    />
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData?.meta_keywords?.map((tag: string) => (
                                            <span key={tag} className="flex items-center px-3 py-1 rounded-full border border-purple-600 text-purple-600 text-sm font-medium">
                                                {tag}
                                                <button onClick={() => handleDeleteTag(tag)} className="ml-2 hover:text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Section Editors */}
                                {[1, 2, 3].map((num) => (
                                    <div key={num} className="pt-4 border-t border-gray-100">
                                        <h2 className="text-2xl font-bold mb-4">Section {num}</h2>
                                        <div className="space-y-4">
                                            <div className="flex flex-col">
                                                <label className="text-sm font-semibold mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border border-gray-300  font-extrabold focus:ring-2 focus:ring-blue-500 outline-none"
                                                    value={formData?.[`section${num}`]?.title}
                                                    onChange={(e) => handleUpdate(`section${num}.title`, e.target.value)}
                                                />
                                            </div>

                                            <RichTextEditor
                                                value={editorValue[`section${num}`] || formData?.[`section${num}`]?.description}
                                                setValue={(val: any) => setEditorValue((prev: any) => ({ ...prev, [`section${num}`]: val }))}
                                                onBlur={() => handleUpdate(`section${num}.description`, editorValue[`section${num}`])}
                                            />

                                            <div>
                                                <p className="text-lg font-semibold mb-2">Add Image</p>
                                                {formData?.[`section${num}`]?.image && (
                                                    <div className="mt-4 mb-4">
                                                        <img
                                                            src={formData?.[`section${num}`]?.image?.includes('site-pages') ? `storage${formData?.[`section${num}`]?.image}` : formData?.[`section${num}`]?.image}
                                                            alt="Preview"
                                                            className="w-1/2  shadow-sm"
                                                        />
                                                    </div>
                                                )}
                                                <ImageUploader setImage={handleSectionImageUpload} path={`section${num}.image`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Area */}
                        <div className="col-span-12 md:col-span-4 space-y-6">

                            {/* Categories Sidebar */}
                            <div className="bg-white  shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {categoriesList?.map((cat: any) => (
                                        <label key={cat.id} className="flex items-center space-x-3 cursor-pointer py-1">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 rounded"
                                                checked={selectedGroup == cat.id}
                                                onChange={() => handleCategoryChange(cat.id)}
                                            />
                                            <span className="text-sm text-gray-600">{cat.name_en}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}


EditExistingPage.Layout = 'authGuard';
export default EditExistingPage;
