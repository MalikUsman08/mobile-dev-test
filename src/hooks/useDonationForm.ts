import { useState, useCallback } from 'react';
import { NewDonationItem, Currency } from '../interfaces/donation';

interface FormData {
  name: string;
  locationId: string;
  themeId: string;
  price: {
    amount: number;
    currency: Currency;
  };
}

interface FormErrors {
  name?: string;
  price?: string;
  currency?: string;
  locationId?: string;
  themeId?: string;
}

export const useDonationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    locationId: '',
    themeId: '',
    price: {
      amount: 0,
      currency: { id: 'EUR', symbol: '€' },
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.price.amount <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.price.currency) {
      newErrors.currency = 'Currency is required';
    }

    if (!formData.locationId) {
      newErrors.locationId = 'Location is required';
    }

    if (!formData.themeId) {
      newErrors.themeId = 'Theme is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handlePriceChange = useCallback(
    (field: 'amount' | 'currency', value: number | Currency) => {
      setFormData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [field]: value,
        },
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      locationId: '',
      themeId: '',
      price: {
        amount: 0,
        currency: { id: 'EUR', symbol: '€' },
      },
    });
    setErrors({});
  }, []);

  const getNewDonationItem = useCallback((): NewDonationItem => {
    return {
      name: formData.name,
      locationId: formData.locationId,
      themeId: formData.themeId,
      price: formData.price,
    };
  }, [formData]);

  return {
    formData,
    errors,
    validateForm,
    handleInputChange,
    handlePriceChange,
    resetForm,
    getNewDonationItem,
  };
};
