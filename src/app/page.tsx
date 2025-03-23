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

import PrizePool from '@/components/ui/prize-pool/PrizePool'

import BonusSponsor from '@/components/ui/bonus-sponsor/BonusSponsor'

import ProgramAffiliate from '@/components/ui/program-affiliate/ProgramAffiliate'

import Potensi from '@/components/ui/potensi/Potensi'

import Reward from '@/components/ui/reward/Reward'

import PotensiSuport from '@/components/ui/potensi/PotensiSuport'

import RewardSponsor from '@/components/ui/reward-sponsor/RewardSponsor'

import SisaHasilusaha from '@/components/ui/sisa-hasil-usaha/SisaHasilusaha'

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
      <PrizePool />
      <BonusSponsor />
      <ProgramAffiliate />
      <Potensi />
      <Reward />
      <PotensiSuport />
      <RewardSponsor />
      <SisaHasilusaha />
    </Fragment>
  )
}
