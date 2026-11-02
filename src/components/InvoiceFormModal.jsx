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

  // როდესაც initialData შეიცვლება (ანუ ედითზე დავაჭერთ), ფორმა შეივსება ამ მონაცემებით
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

  const handleFormSubmit = (data, status) => {
    const newInvoice = {
      ...data,
      total: totalAmount,
      status: status || initialData?.status || 'Pending',
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
    <div className="fixed inset-0 bg-black/50 z-30 flex justify-start pl-[100px]">
      <div className="bg-white w-full max-w-2xl h-full flex flex-col relative shadow-2xl rounded-r-[30px]">
        
        <div className="px-12 pt-10 pb-4 bg-white z-10">
          <h2 className="text-3xl font-extrabold text-[#0c0e16]">
            {initialData ? `Edit #${initialData.id}` : 'New Invoice'}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-12 pb-24">
          <form id="invoice-form" className="flex flex-col gap-6 pt-4">
            
            <div>
              <h4 className="text-[#7c5dfa] font-bold text-xs mb-3 tracking-wide">Bill From</h4>
              <label className="text-xs text-[#7e88c3] font-bold">Street Address</label>
              <input {...register('street')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm focus:outline-[#7c5dfa]" />
              {errors.street && <span className="text-red-500 text-xs">{errors.street.message}</span>}

              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">City</label>
                  <input {...register('city')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Post Code</label>
                  <input {...register('postCode')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Country</label>
                  <input {...register('country')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[#7c5dfa] font-bold text-xs mb-3 tracking-wide">Bill To</h4>
              <div className="mb-3">
                <label className="text-xs text-[#7e88c3] font-bold">Invoice ID</label>
                <input {...register('id')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                {errors.id && <span className="text-red-500 text-xs">{errors.id.message}</span>}
              </div>
              <div className="mb-3">
                <label className="text-xs text-[#7e88c3] font-bold">Client's Name</label>
                <input {...register('clientName')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
              </div>
              <div className="mb-3">
                <label className="text-xs text-[#7e88c3] font-bold">Client's Email</label>
                <input {...register('clientEmail')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
              </div>
              <label className="text-xs text-[#7e88c3] font-bold">Street Address</label>
              <input {...register('clientStreet')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />

              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">City</label>
                  <input {...register('clientCity')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Post Code</label>
                  <input {...register('clientPostCode')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#7e88c3] font-bold">Country</label>
                  <input {...register('clientCountry')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <input {...register('projectDescription')} className="w-full border rounded-md p-3 mt-1 border-gray-200 text-sm" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#777f98] mb-3">Item List</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-2 items-center mb-3">
                  <div className="col-span-5">
                    <label className="text-[10px] text-[#7e88c3] font-bold">Item Name</label>
                    <input {...register(`items.${index}.name`)} className="w-full border rounded-md p-2.5 border-gray-200 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-[#7e88c3] font-bold">Qty.</label>
                    <input type="number" {...register(`items.${index}.quantity`)} className="w-full border rounded-md p-2.5 border-gray-200 text-sm text-center" />
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] text-[#7e88c3] font-bold">Price</label>
                    <input type="number" step="0.01" {...register(`items.${index}.price`)} className="w-full border rounded-md p-2.5 border-gray-200 text-sm" />
                  </div>
                  <div className="col-span-2 flex justify-between items-end pt-4">
                    <span className="text-sm font-bold text-[#888eb0]">£{(watchedItems?.[index]?.quantity * watchedItems?.[index]?.price || 0).toFixed(2)}</span>
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

        <div className="absolute bottom-0 left-0 right-0 bg-white px-12 py-5 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.08)] rounded-r-[30px] z-20">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#f9f9f6] text-[#7e88c3] px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSubmit((data) => handleFormSubmit(data))}
              className="bg-[#7c5dfa] text-white px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer hover:bg-[#9277ff] transition"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};