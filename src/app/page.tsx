import React, { Fragment } from 'react'

import Home from '@/components/ui/home/Home'

import Partner from '@/components/ui/partner/Partner'

import TentangKami from '@/components/ui/tentang-kami/Tentang-kami'

import Legalisasi from '@/components/ui/legalisasi/Legalisasi'

import TrendBisnis from '@/components/ui/trend-bisnis/Trend-Bisnis'

import Insplentasi from '@/components/ui/insplenstasi/Insplentasi'

import Assets from '@/components/ui/assets/Assets'

import DataBlockHain from '@/components/ui/data-blockhain/DataBlockHain'

import ImpianAnda from '@/components/ui/impian-anda/ImpianAnda'

import PendaftaranAnggotaKoperasi from '@/components/ui/pendaftaran-anggota-koperasi/PendaftaranAnggotaKoperasi'

export default function HomeScreen() {
  return (
    <Fragment>
      <Home />
      <Partner />
      <TentangKami />
      <Legalisasi />
      <TrendBisnis />
      <Insplentasi />
      <Assets />
      <DataBlockHain />
      <ImpianAnda />
      <PendaftaranAnggotaKoperasi />
    </Fragment>
  )
}
