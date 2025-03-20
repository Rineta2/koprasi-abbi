'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign } from 'react-icons/fi';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    ChartOptions,
    Scale,
    CoreScaleOptions,
    TooltipItem as ChartTooltipItem
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';

import { useStats } from '@/hooks/dashboard/user/card/utils/useStats';

import { useChartData } from '@/hooks/dashboard/user/card/utils/useChartData';

import { useAuth } from "@/utils/context/AuthContext";

import Image from 'next/image';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip
);

export default function UserDashboardPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const { stats } = useStats();
    const { salesData, categoryData, topSellingItems } = useChartData();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    // Chart.js data configuration for line chart
    const lineChartData = {
        labels: salesData.map(item => item.name),
        datasets: [
            {
                label: 'Total Pembelian (Rp)',
                data: salesData.map(item => item.value),
                borderColor: '#f43f5e',
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                fill: true,
            }
        ]
    };

    // Chart.js data configuration for doughnut chart
    const doughnutChartData = {
        labels: categoryData.map(item => item.name),
        datasets: [
            {
                data: categoryData.map(item => item.value),
                backgroundColor: categoryData.map(item => item.color),
            }
        ]
    };

    const lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    callback: function (
                        this: Scale<CoreScaleOptions>,
                        tickValue: string | number
                    ): string {
                        return 'Rp ' + Number(tickValue).toLocaleString('id-ID');
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const
            },
            tooltip: {
                callbacks: {
                    label: function (
                        tooltipItem: ChartTooltipItem<'line'>
                    ): string {
                        const value = Number(tooltipItem.raw);
                        return 'Rp ' + value.toLocaleString('id-ID');
                    }
                }
            }
        }
    } as const;

    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (
                        tooltipItem: ChartTooltipItem<'doughnut'>
                    ): string {
                        const value = Number(tooltipItem.raw);
                        return `${tooltipItem.label}: ${value}%`;
                    }
                }
            }
        }
    } as const;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {/* Stats Cards */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <FiTrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-emerald-600 text-sm font-medium">Sukses</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">{stats.totalTransactions}</h3>
                <p className="text-slate-600 text-sm">Total Transaksi Sukses</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FiShoppingBag className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-emerald-600 text-sm font-medium">Produk</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">{stats.totalProducts}</h3>
                <p className="text-slate-600 text-sm">Produk Dibeli</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                        <FiUsers className="w-6 h-6 text-violet-600" />
                    </div>
                    <span className="text-emerald-600 text-sm font-medium">Jaringan</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">{stats.totalReferralNetwork}</h3>
                <p className="text-slate-600 text-sm">Total Referral</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                        <FiDollarSign className="w-6 h-6 text-sky-600" />
                    </div>
                    <span className="text-emerald-600 text-sm font-medium capitalize">{user.accountType}</span>
                </div>
                <h3 className="text-2xl font-bold mt-4 capitalize">{user.accountType}</h3>
                <p className="text-slate-600 text-sm">Status Akun</p>
            </div>

            {/* Sales Chart */}
            <div className="col-span-full lg:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="text-lg font-semibold">Riwayat Transaksi</h3>
                    <select className="text-sm border rounded-lg px-3 py-2 w-full md:w-auto">
                        <option>Minggu Ini</option>
                        <option>Minggu Lalu</option>
                        <option>Bulan Ini</option>
                    </select>
                </div>
                <div className="relative w-full h-[300px]">
                    <Line
                        data={lineChartData}
                        options={lineChartOptions}
                    />
                </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Kategori Pembelian</h3>
                <div className="relative h-[250px] flex justify-center">
                    <Doughnut
                        data={doughnutChartData}
                        options={doughnutOptions}
                    />
                </div>
                <div className="mt-4 space-y-2 max-h-[200px] relative overflow-y-auto custom-scrollbar">
                    {categoryData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-gray-600">{item.name}</span>
                            </div>
                            <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Selling Items */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Pembelian Terakhir</h3>
                <div className="relative space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {topSellingItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 48px) 100vw, 48px"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.sales} item</p>
                                </div>
                            </div>
                            <span className="text-green-500 text-sm font-medium">{item.trend}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}