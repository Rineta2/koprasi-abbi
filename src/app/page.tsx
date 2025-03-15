import React, { Fragment } from 'react'

import Home from '@/components/ui/home/Home'

import Partner from '@/components/ui/partner/Partner'

import TentangKami from '@/components/ui/tentang-kami/Tentang-kami'

import Legalisasi from '@/components/ui/legalisasi/Legalisasi'

export default function HomeScreen() {
  return (
    <Fragment>
      <Home />
      <Partner />
      <TentangKami />
      <Legalisasi />
    </Fragment>
  )
}
