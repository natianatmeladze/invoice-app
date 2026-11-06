import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  id: z.string().min(1, 'შეიყვანეთ აიდი'),
  street: z.string().min(1, 'ქუჩა სავალდებულოა'),
  city: z.string().min(1, 'ქალაქი სავალდებულოა'),
  postCode: z.string().min(1, 'პოსტ კოდი სავალდებულოა'),
  country: z.string().min(1, 'ქვეყანა სავალდებულოა'),
  clientName: z.string().min(2, 'კლიენტის სახელი სავალდებულოა'),
  clientEmail: z.string().email('არასწორი მეილის ფორმატი'),
  clientStreet: z.string().min(1, 'კლიენტის ქუჩა სავალდებულოა'),
  clientCity: z.string().min(1, 'კლიენტის ქალაქი სავალდებულოა'),
  clientPostCode: z.string().min(1, 'კლიენტის პოსტ კოდი სავალდებულოა'),
  clientCountry: z.string().min(1, 'კლიენტის ქვეყანა სავალდებულოა'),
  invoiceDate: z.string().min(1, 'თარიღი სავალდებულოა'),
  paymentTerms: z.string().min(1, 'აირჩიეთ გადახდის პირობა'),
  projectDescription: z.string().min(1, 'აღწერა სავალდებულოა'),
  items: z.array(
    z.object({
      name: z.string().min(1, 'სახელი სავალდებულოა'),
      quantity: z.coerce.number().min(1, 'მინ. 1'),
      price: z.coerce.number().min(0, 'ფასი არასწორია'),
    })
  ).min(1, 'საჭიროა მინიმუმ ერთი ნივთი'),
});

export const InvoiceFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: '',
      street: '',
      city: '',
      postCode: '',
      country: '',
      clientName: '',
      clientEmail: '',
      clientStreet: '',
      clientCity: '',
      clientPostCode: '',
      clientCountry: '',
      invoiceDate: '',
      paymentTerms: '30',
      projectDescription: '',
      items: [{ name: '', quantity: 1, price: 0 }],
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        id: '',
        street: '',
        city: '',
        postCode: '',
        country: '',
        clientName: '',
        clientEmail: '',
        clientStreet: '',
        clientCity: '',
        clientPostCode: '',
        clientCountry: '',
        invoiceDate: '',
        paymentTerms: '30',
        projectDescription: '',
        items: [{ name: '', quantity: 1, price: 0 }],
      });
    }
  }, [initialData, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');
  const totalAmount = watchedItems?.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0) || 0;

  if (!isOpen) return null;

  // status პარამეტრით ვარეგულირებთ არის თუ არა Draft (დრაფტი) ან Pending (Save & Send)
  const handleFormSubmit = (data, status) => {
    const newInvoice = {
      ...data,
      total: totalAmount,
      status: status,
      paymentDue: data.invoiceDate,
      items: data.items.map(item => ({
        ...item,
        total: item.quantity * item.price
      }))
    };
    onSave(newInvoice);
    onClose();
  };

  return (
    // გარე შავი ფონი, რომელიც საიდბარის მერე იწყება (pl-[100px] დესკტოპზე)
    <div className="fixed inset-0 bg-black/50 z-30 flex justify-start pl-0 md:pl-[100px]">
      
      {/* მოდალის ძირითადი თეთრი კონტეინერი */}
      <div className="bg-white w-full max-w-2xl h-full flex flex-col relative shadow-2xl rounded-none md:rounded-r-[30px]">
        
        {/* სათაური */}
        <div className="px-6 md:px-12 pt-8 md:pt-10 pb-4 bg-white z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0e16]">
            {initialData ? `Edit #${initialData.id}` : 'New Invoice'}
          </h2>
        </div>

        {/* სქროლვადი ფორმა */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-32">
          <form id="invoice-form" className="flex flex-col gap-6 pt-4">
            
            {/* Bill From */}
            <div>
              <h4 className="text-[#7c5dfa] font-bold text-xs mb-3 tracking-wide">Bill From</h4>
              <label className="text-xs text-[#7e88c3] font-bold">Street Address</label>
              <input {...register('street')} placeholder="e.g. 19 Union Terrace" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm focus:outline-[#7c5dfa]" />
              {errors.street && <span className="text-red-500 text-xs">{errors.street.message}</span>}

              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">City</label>
                  <input {...register('city')} placeholder="e.g. London" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Post Code</label>
                  <input {...register('postCode')} placeholder="e.g. E1 3EZ" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Country</label>
                  <input {...register('country')} placeholder="e.g. United Kingdom" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div>
              <h4 className="text-[#7c5dfa] font-bold text-xs mb-3 tracking-wide">Bill To</h4>
              <div className="mb-3">
                <label className="text-xs text-[#7e88c3] font-bold">Invoice ID</label>
                <input {...register('id')} placeholder="e.g. XM9141" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                {errors.id && <span className="text-red-500 text-xs">{errors.id.message}</span>}
              </div>
              <div className="mb-3">
                <label className="text-xs text-[#7e88c3] font-bold">Client's Name</label>
                <input {...register('clientName')} placeholder="e.g. Alex Grim" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
              </div>
              <div className="mb-3">
                <label className="text-xs text-[#7e88c3] font-bold">Client's Email</label>
                <input {...register('clientEmail')} placeholder="e.g. alexgrim@mail.com" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
              </div>
              <label className="text-xs text-[#7e88c3] font-bold">Street Address</label>
              <input {...register('clientStreet')} placeholder="e.g. 84 Church Way" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />

              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">City</label>
                  <input {...register('clientCity')} placeholder="e.g. Bradford" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Post Code</label>
                  <input {...register('clientPostCode')} placeholder="e.g. BD1 9PB" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Country</label>
                  <input {...register('clientCountry')} placeholder="e.g. United Kingdom" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
              </div>
            </div>

            {/* Date & Terms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#7e88c3] font-bold">Invoice Date</label>
                <input type="date" {...register('invoiceDate')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-xs text-[#7e88c3] font-bold">Payment Terms</label>
                <select {...register('paymentTerms')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm bg-white">
                  <option value="1">Net 1 Day</option>
                  <option value="7">Net 7 Days</option>
                  <option value="14">Net 14 Days</option>
                  <option value="30">Net 30 Days</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#7e88c3] font-bold">Project Description</label>
              <input {...register('projectDescription')} placeholder="e.g. Graphic Design Service" className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
            </div>

            {/* Item List */}
            <div>
              <h3 className="text-lg font-bold text-[#777f98] mb-3">Item List</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-2 items-center mb-3">
                  <div className="col-span-5">
                    <label className="text-[10px] text-[#7e88c3] font-bold">Item Name</label>
                    <input {...register(`items.${index}.name`)} placeholder="e.g. Banner Design" className="w-full border rounded-md p-2.5 border-gray-200 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-[#7e88c3] font-bold">Qty.</label>
                    <input type="number" {...register(`items.${index}.quantity`)} placeholder="1" className="w-full border rounded-md p-2.5 border-gray-200 text-sm text-center" />
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] text-[#7e88c3] font-bold">Price</label>
                    <input type="number" step="0.01" {...register(`items.${index}.price`)} placeholder="0.00" className="w-full border rounded-md p-2.5 border-gray-200 text-sm" />
                  </div>
                  <div className="col-span-2 flex justify-between items-end pt-4">
                    <span className="text-xs md:text-sm font-bold text-[#888eb0]">£{(watchedItems?.[index]?.quantity * watchedItems?.[index]?.price || 0).toFixed(2)}</span>
                    {fields.length > 1 && (
                      <button type="button" onClick={() => remove(index)} className="text-gray-400 hover:text-red-500 font-bold cursor-pointer pb-1">
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ name: '', quantity: 1, price: 0 })}
                className="w-full bg-[#f9f9fc] hover:bg-gray-200 text-[#7e88c3] font-bold py-3.5 rounded-full mt-2 text-sm transition cursor-pointer"
              >
                + Add New Item
              </button>
            </div>

          </form>
        </div>

        {/* ქვედა ფიქსირებული თეთრი პანელი ღილაკებით (Discard, Save as Draft, Save & Send) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-6 md:px-12 py-5 flex flex-wrap justify-between items-center gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] rounded-none md:rounded-r-[30px] z-20">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#f9f9f6] text-[#7e88c3] px-5 md:px-7 py-3.5 rounded-full font-bold text-xs md:text-sm cursor-pointer hover:bg-gray-200 transition"
          >
            Discard
          </button>
          <div className="flex gap-2 md:gap-3">
            <button
              type="button"
              onClick={handleSubmit((data) => handleFormSubmit(data, 'Draft'))}
              className="bg-[#373b53] text-white px-4 md:px-7 py-3.5 rounded-full font-bold text-xs md:text-sm cursor-pointer hover:bg-black transition"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSubmit((data) => handleFormSubmit(data, 'Pending'))}
              className="bg-[#7c5dfa] text-white px-4 md:px-7 py-3.5 rounded-full font-bold text-xs md:text-sm cursor-pointer hover:bg-[#9277ff] transition"
            >
              Save & Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};