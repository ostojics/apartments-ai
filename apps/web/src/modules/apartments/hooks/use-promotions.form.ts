import {zodResolver} from '@hookform/resolvers/zod';
import {PromotionsRequestDTO, promotionsRequestSchema} from '@host-elite/contracts';
import {useForm} from 'react-hook-form';

interface UsePromotionsFormProps {
  preferredLanguage: string;
}

export const usePromotionsForm = ({preferredLanguage}: UsePromotionsFormProps) => {
  return useForm<PromotionsRequestDTO>({
    resolver: zodResolver(promotionsRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredLanguage,
    },
  });
};
