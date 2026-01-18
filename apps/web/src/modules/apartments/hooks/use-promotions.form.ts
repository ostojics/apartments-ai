import {createZodResolver} from '@/lib/utils/zod-resolver';
import {PromotionsRequestDTO, promotionsRequestSchema} from '@acme/contracts';
import {useForm} from 'react-hook-form';

interface usePromotionsFormProps {
  preferredLanguage: string;
}

export const usePromotionsForm = ({preferredLanguage}: usePromotionsFormProps) => {
  return useForm<PromotionsRequestDTO>({
    resolver: createZodResolver<PromotionsRequestDTO>(promotionsRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredLanguage,
    },
  });
};
