import { useState, useCallback } from 'react';
import { useDonations } from './useDonations';
import { NewDonationItem } from '../interfaces/donation';

interface FormData {
  name: string;
  location: string;
  theme: string;
  price: {
    currencyCode: string;
    amount: number;
  };
}

interface FormErrors {
  name?: string;
  location?: string;
  theme?: string;
  price?: string;
}

export const useDonationForm = () => {
  const { createDonation } = useDonations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!data.location) {
      newErrors.location = 'Location is required';
    }

    if (!data.theme) {
      newErrors.theme = 'Theme is required';
    }

    console.log(
      '[validateForm] price.amount value:',
      data.price.amount,
      'type:',
      typeof data.price.amount
    );
    if (!data.price.amount || data.price.amount <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    return newErrors;
  };

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setError(null);
        setErrors({});
        setIsSubmitting(true);

        const validationErrors = validateForm(data);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return null;
        }

        const newDonation: NewDonationItem = {
          name: data.name,
          location: data.location || null,
          theme: data.theme || null,
          price: {
            currencyCode: 'GBP',
            amount: data.price.amount || null,
          },
        };

        console.log('Submitting donation:', newDonation);
        const created = await createDonation(newDonation);
        return created;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to create donation'
        );
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [createDonation]
  );

  return {
    handleSubmit,
    isSubmitting,
    error,
    errors,
  };
};
