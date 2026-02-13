import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '../ui/button';
import {useNavigate} from '@tanstack/react-router';

const NotFound = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="bg-secondary h-screen flex flex-col items-center justify-center p-3">
      <h1 className="text-4xl text-center font-bold mb-4">{t('notFound.title')}</h1>
      <Button onClick={() => navigate({to: '/'})}>{t('notFound.goToStart')}</Button>
    </section>
  );
};

export default NotFound;
