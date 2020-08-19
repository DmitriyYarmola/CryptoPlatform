import React from 'react'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { SettingsSelectors } from 'Lib/Store/settings'

import { english } from './locales/en-US'
import { french } from './locales/fr-FR'
import { russian } from './locales/ru-RU'
import { chinese } from './locales/zh-CN'

const locales = {
  'en-US': english,
  'fr-FR': french,
  'ru-RU': russian,
  'zh-CN': chinese,
}

export const Localization = ({ children }) => {
  const { locale } = useSelector(SettingsSelectors.settings)
  const currentLocale = locales[locale]
  return (
    <ConfigProvider locale={currentLocale.localeAntd}>
      <IntlProvider locale={currentLocale.locale} messages={currentLocale.messages}>
        {children}
      </IntlProvider>
    </ConfigProvider>
  )
}
