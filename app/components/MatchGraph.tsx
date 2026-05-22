'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'



    interface GoldAdvChartProps {
    gold: number[];
}

export default function MatchGraph({ gold }: GoldAdvChartProps) {
    const data = gold?.map((adv, index) => ({
        time: index,
        gold: adv,
    })) || [];
    if (data.length === 0) return null;
    
    const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const gold = payload[0].value;
        const isRadiant = gold > 0; // Якщо золото в плюсі - перемагає Radiant
        
        return (
            <div className="bg-[#1c242d] border border-gray-700 p-3 rounded shadow-xl text-white">
                <p className="text-gray-400 text-sm mb-1">{`Хвилина: ${label}`}</p>
                <p className={`font-bold ${isRadiant ? 'text-green-500' : 'text-red-500'}`}>
                    Win: {isRadiant ? 'Radiant' : 'Dire'} (+{Math.abs(gold)} gold)
                </p>
            </div>
        );
        }
            return null;
        };

    return (
        <div className="w-full h-64 mt-8">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />

                    <ReferenceLine y={0} stroke="red" strokeWidth={2} />

                    <Line type="monotone" dataKey="gold" stroke="#eab308" dot={false} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
