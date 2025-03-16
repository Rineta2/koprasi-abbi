import React, { Fragment } from 'react'

import Home from '@/components/ui/home/Home'

import Partner from '@/components/ui/partner/Partner'

import TentangKami from '@/components/ui/tentang-kami/Tentang-kami'

import Legalisasi from '@/components/ui/legalisasi/Legalisasi'

import TrendBisnis from '@/components/ui/trend-bisnis/Trend-Bisnis'

import Insplentasi from '@/components/ui/insplenstasi/Insplentasi'

export default function HomeScreen() {
  return (
    <Fragment>
      <Home />
      <Partner />
      <TentangKami />
      <Legalisasi />
      <TrendBisnis />
      <Insplentasi />
    </Fragment>
  )
}
