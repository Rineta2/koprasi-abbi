'use client';

import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import { useRouter } from 'next/navigation';

import {
    FiBarChart2,
    FiShoppingCart,
    FiUsers,
    FiSun
} from 'react-icons/fi';

import { MdManageAccounts } from "react-icons/md";

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
    TooltipItem as ChartTooltipItem,
    Filler
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';

import { useStats } from '@/hooks/dashboard/user/card/utils/useStats';

import { useChartData } from '@/hooks/dashboard/user/card/utils/useChartData';

import { useAuth } from "@/utils/context/AuthContext";

import Image from 'next/image';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Filler
);

interface WeatherState {
    temp: number | null;
    condition: string;
    city: string;
    error: string | null;
}

import CardSkelaton from '@/hooks/dashboard/user/card/CardSkelaton';

export default function UserDashboardPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { stats, loading: statsLoading } = useStats();
    const { salesData, categoryData, topSellingItems, loading: chartLoading } = useChartData();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [weather, setWeather] = useState<WeatherState>({
        temp: null,
        condition: 'Loading...',
        city: 'Loading...',
        error: null
    });
    const [currentTime, setCurrentTime] = useState(new Date());

    // Gabungkan semua loading state
    const isLoading = authLoading || statsLoading || chartLoading || !user;

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        // Fetch weather data
        const getWeather = async () => {
            try {
                if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
                    throw new Error('Weather API key not configured');
                }

                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Jakarta&aqi=no`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Weather service unavailable');
                }

                const data = await response.json();
                setWeather({
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    city: data.location.name,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching weather:', error);
                setWeather({
                    temp: null,
                    condition: 'Error',
                    city: 'Error',
                    error: 'Unable to load weather data'
                });
            }
        };

        getWeather();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return <CardSkelaton />;
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
        <section>
            <div className="flex flex-col gap-8">
                {/* Welcome Message with Digital Clock */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between gap-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Halo, selamat datang {user.fullName}! 👋
                        </h1>
                        <div className="text-2xl font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-xl">
                            {currentTime.toLocaleTimeString('id-ID')}
                        </div>
                    </div>
                </div>

                {/* Top Stats Row */}
                <div className="flex flex-wrap gap-4 md:gap-8">
                    {/* Weather Card */}
                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-blue-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiSun className="w-7 h-7 text-blue-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-blue-100/50 backdrop-blur text-blue-600 text-sm font-medium rounded-full">Cuaca</span>
                        </div>
                        {weather.error ? (
                            <div className="mt-4">
                                <p className="text-red-500 text-sm">{weather.error}</p>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    {weather.temp !== null ? `${weather.temp}°C` : '--°C'}
                                </h3>
                                <p className="text-slate-600 text-sm font-medium">{weather.condition}</p>
                                <p className="text-slate-500 text-sm">{weather.city}</p>
                            </div>
                        )}
                    </div>

                    {/* Stats Cards */}
                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-amber-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiBarChart2 className="w-7 h-7 text-amber-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Sukses</span>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-3xl font-bold mb-2">{stats.totalTransactions}</h3>
                            <p className="text-slate-600 text-sm font-medium">Total Transaksi Sukses</p>
                        </div>
                    </div>

                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-emerald-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiShoppingCart className="w-7 h-7 text-emerald-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Produk</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2">{stats.totalProducts}</h3>
                        <p className="text-slate-600 text-sm font-medium">Produk Dibeli</p>
                    </div>

                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-violet-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiUsers className="w-7 h-7 text-violet-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Jaringan</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2">{stats.totalReferralNetwork}</h3>
                        <p className="text-slate-600 text-sm font-medium">Total Referral</p>
                    </div>

                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-sky-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <MdManageAccounts className="w-7 h-7 text-sky-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full capitalize">{user.accountType}</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2 capitalize">{user.accountType}</h3>
                        <p className="text-slate-600 text-sm font-medium">Status Akun</p>
                    </div>
                </div>

                {/* Main Content Row */}
                <div className="flex flex-wrap gap-4 md:gap-8">
                    {/* Sales Chart */}
                    <div className="flex-[2] min-w-[320px] bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Riwayat Transaksi</h3>
                            <div className="flex flex-wrap w-full md:w-auto gap-4 items-center">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date | null) => setStartDate(date)}
                                    className="w-full md:w-auto text-sm border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Pilih tanggal"
                                />
                                <select className="w-full md:w-auto text-sm border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50">
                                    <option>Minggu Ini</option>
                                    <option>Minggu Lalu</option>
                                    <option>Bulan Ini</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative w-full h-[350px]">
                            <Line data={lineChartData} options={lineChartOptions} />
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="flex-1 min-w-[320px] bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8">Kategori Pembelian</h3>
                        <div className="relative h-[280px] flex justify-center">
                            <Doughnut data={doughnutChartData} options={doughnutOptions} />
                        </div>
                        <div className="mt-6 space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                            {categoryData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50/80 rounded-xl transition-all duration-200">
                                    <div className="flex items-center">
                                        <div
                                            className="w-4 h-4 rounded-full mr-3"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-semibold">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Selling Items */}
                    <div className="w-full bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">Pembelian Terakhir</h3>
                        <div className="flex flex-wrap gap-4">
                            {topSellingItems.map((item) => (
                                <div key={item.id} className="flex-1 min-w-[300px] flex items-center justify-between p-3 hover:bg-gray-50/80 rounded-xl transition-all duration-200">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 64px) 100vw, 64px"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500 mt-1">{item.sales} item</p>
                                        </div>
                                    </div>
                                    <span className="text-green-500 text-sm font-semibold">{item.trend}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}