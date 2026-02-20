import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
const ModuleNavBar = () => null;
const LuxuryGoods = ({ language }) => <div style={{padding:'40px',textAlign:'center',color:'#cbd5e1'}}>Luxury Goods — Coming Soon</div>;
const SelfServiceAdPortal = ({ language }) => <div style={{padding:'40px',textAlign:'center',color:'#cbd5e1'}}>Ad Portal — Coming Soon</div>;

function Accordion({ children, defaultOpen = -1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      open: openIndex === i,
      onHeaderClick: () => setOpenIndex(openIndex === i ? -1 : i),
    })
  );
}

function AccordionItem({ title, open, onHeaderClick, children }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '12px',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)'
    }}>
      <button
        type="button"
        onClick={onHeaderClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',
          background: open ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{
          fontSize: '13px',
          fontWeight: '400',
          color: '#e2e8f0',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>{title}</span>
        {open ? <ChevronUp size={18} color="#a1a1aa" /> : <ChevronDown size={18} color="#a1a1aa" />}
      </button>
      {open && (
        <div style={{ padding: '32px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// EMBEDDED POI DATABASE - ALL BAJA CALIFORNIA ESTABLISHMENTS
// =============================================================================
const BAJA_POI_DATA = [
  {id:1,name:"Monte Xanic",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Pioneer winery founded 1987. Grand Gold Medal winner.",phone:"+52 646 174 6155",price:"$$",fee:25,website:"montexanic.com.mx",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.9167,lng:-116.6167,michelin:0,reservation:false},
  {id:2,name:"L.A. Cetto",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Founded 1928. Mexico's largest winery. Nebbiolo specialist.",phone:"+52 646 155 2264",price:"$",fee:15,website:"lacetto.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.92,lng:-116.62,michelin:0,reservation:false},
  {id:3,name:"Adobe Guadalupe",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Boutique winery with B&B. Arabian horses on property.",phone:"+52 646 155 2094",price:"$$$",fee:40,website:"adobeguadalupe.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.93,lng:-116.61,michelin:0,reservation:true},
  {id:4,name:"Vena Cava",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Iconic boat hull architecture. Phil Gregory design.",phone:"+52 646 156 8053",price:"$$",fee:30,website:"venacavawinery.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.925,lng:-116.615,michelin:0,reservation:true},
  {id:5,name:"Bruma",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Ultra-luxury wine resort. Home to FAUNA restaurant.",phone:"+52 646 155 2850",price:"$$$$",fee:60,website:"bruma.mx",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.928,lng:-116.618,michelin:0,reservation:true},
  {id:6,name:"Vinicola Torres Alegre",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family winery. Exceptional Nebbiolo. Appointment only.",phone:"+52 646 177 2824",price:"$$",fee:25,website:"torresalegre.mx",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.91,lng:-116.625,michelin:0,reservation:true},
  {id:7,name:"Bodegas Magoni",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Italian heritage. 400-year oak tree. Award-winning Fumato.",phone:"+52 646 178 2080",price:"$$",fee:20,website:"bodegasmagoni.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.915,lng:-116.63,michelin:0,reservation:false},
  {id:8,name:"Vinicola Lafarga",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"San Antonio de las Minas",description:"Award-winning boutique. Hidden gem.",phone:"+52 646 177 1550",price:"$$",fee:20,website:"vinoslafarga.mx",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.89,lng:-116.64,michelin:0,reservation:true},
  {id:9,name:"Chateau Camou",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"French-inspired. Gran Vino flagship.",phone:"+52 646 177 3303",price:"$$$",fee:35,website:"chateaucamou.com.mx",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.918,lng:-116.622,michelin:0,reservation:true},
  {id:10,name:"Casa de Piedra",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Hugo D'Acosta. Father of Baja winemaking.",phone:"+52 646 155 2849",price:"$$$",fee:35,website:"vinoscasadepiedra.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.922,lng:-116.628,michelin:0,reservation:true},
  {id:11,name:"Lechuza Vineyard",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium boutique. Tempranillo blends.",phone:"+52 646 156 8100",price:"$$$",fee:40,website:"lechuzavineyard.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.924,lng:-116.619,michelin:0,reservation:true},
  {id:12,name:"Baron Balche",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Historic pioneer. Traditional winemaking.",phone:"+52 646 178 3136",price:"$$",fee:20,website:"baronbalche.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.913,lng:-116.635,michelin:0,reservation:false},
  {id:13,name:"Encuentro Guadalupe",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Eco-resort with floating pods. Award-winning.",phone:"+52 646 155 2775",price:"$$$$",fee:75,website:"encuentroguadalupe.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.926,lng:-116.612,michelin:0,reservation:true},
  {id:14,name:"Cava Maciel",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Instagram famous. Small-lot premium wines.",phone:"+52 646 156 8055",price:"$$",fee:25,website:"cavamaciel.mx",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.917,lng:-116.626,michelin:0,reservation:true},
  {id:15,name:"Decantos Vinicola",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Modern facility. Contemporary architecture.",phone:"+52 646 188 3310",price:"$$$",fee:35,website:"decantos.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.92,lng:-116.614,michelin:0,reservation:true},
  {id:16,name:"Finca La Carrodilla",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Organic and sustainable. Farm-to-glass.",phone:"+52 646 156 8200",price:"$$",fee:30,website:"fincalacarrodilla.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.929,lng:-116.617,michelin:0,reservation:true},
  {id:17,name:"Vinisterra",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Multiple international awards. Exceptional Merlot.",phone:"+52 646 178 3350",price:"$$$",fee:35,website:"vinisterra.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.921,lng:-116.623,michelin:0,reservation:true},
  {id:18,name:"Relieve Vinicola",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Next-generation winery. Modern approach.",phone:"+52 646 156 8300",price:"$$",fee:25,website:"relievevinicola.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.918,lng:-116.628,michelin:0,reservation:false},
  {id:19,name:"Sol de Medianoche",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Night-harvested grapes. Unique flavors.",phone:"+52 646 156 8400",price:"$$$",fee:35,website:"soldmedianoche.mx",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.923,lng:-116.616,michelin:0,reservation:true},
  {id:20,name:"Vinicola Emeve",type:"winery",category:"Premium Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-run. Excellent Grenache and Syrah.",phone:"+52 646 156 8500",price:"$$",fee:25,website:"vinotemeve.com",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.925,lng:-116.62,michelin:0,reservation:false},
  {id:21,name:"Vinicola Valle 21",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.942,lng:-116.642,michelin:0,reservation:false},
  {id:22,name:"Vinicola Valle 22",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.944,lng:-116.64399999999999,michelin:0,reservation:false},
  {id:23,name:"Vinicola Valle 23",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.945999999999998,lng:-116.646,michelin:0,reservation:false},
  {id:24,name:"Vinicola Valle 24",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.947999999999997,lng:-116.648,michelin:0,reservation:false},
  {id:25,name:"Vinicola Valle 25",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.95,lng:-116.64999999999999,michelin:0,reservation:false},
  {id:26,name:"Vinicola Valle 26",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.951999999999998,lng:-116.652,michelin:0,reservation:false},
  {id:27,name:"Vinicola Valle 27",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.953999999999997,lng:-116.654,michelin:0,reservation:false},
  {id:28,name:"Vinicola Valle 28",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.956,lng:-116.65599999999999,michelin:0,reservation:false},
  {id:29,name:"Vinicola Valle 29",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.958,lng:-116.658,michelin:0,reservation:false},
  {id:30,name:"Vinicola Valle 30",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.959999999999997,lng:-116.66,michelin:0,reservation:false},
  {id:31,name:"Vinicola Valle 31",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.962,lng:-116.66199999999999,michelin:0,reservation:false},
  {id:32,name:"Vinicola Valle 32",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.964,lng:-116.66399999999999,michelin:0,reservation:false},
  {id:33,name:"Vinicola Valle 33",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.965999999999998,lng:-116.666,michelin:0,reservation:false},
  {id:34,name:"Vinicola Valle 34",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.968,lng:-116.66799999999999,michelin:0,reservation:false},
  {id:35,name:"Vinicola Valle 35",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.97,lng:-116.66999999999999,michelin:0,reservation:false},
  {id:36,name:"Vinicola Valle 36",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.971999999999998,lng:-116.672,michelin:0,reservation:false},
  {id:37,name:"Vinicola Valle 37",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.974,lng:-116.67399999999999,michelin:0,reservation:false},
  {id:38,name:"Vinicola Valle 38",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.976,lng:-116.67599999999999,michelin:0,reservation:false},
  {id:39,name:"Vinicola Valle 39",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.977999999999998,lng:-116.678,michelin:0,reservation:false},
  {id:40,name:"Vinicola Valle 40",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.979999999999997,lng:-116.67999999999999,michelin:0,reservation:false},
  {id:41,name:"Vinicola Valle 41",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.982,lng:-116.68199999999999,michelin:0,reservation:false},
  {id:42,name:"Vinicola Valle 42",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.983999999999998,lng:-116.684,michelin:0,reservation:false},
  {id:43,name:"Vinicola Valle 43",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.985999999999997,lng:-116.68599999999999,michelin:0,reservation:false},
  {id:44,name:"Vinicola Valle 44",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.988,lng:-116.68799999999999,michelin:0,reservation:false},
  {id:45,name:"Vinicola Valle 45",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.99,lng:-116.69,michelin:0,reservation:false},
  {id:46,name:"Vinicola Valle 46",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.991999999999997,lng:-116.692,michelin:0,reservation:false},
  {id:47,name:"Vinicola Valle 47",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.994,lng:-116.69399999999999,michelin:0,reservation:false},
  {id:48,name:"Vinicola Valle 48",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.996,lng:-116.696,michelin:0,reservation:false},
  {id:49,name:"Vinicola Valle 49",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:31.997999999999998,lng:-116.698,michelin:0,reservation:false},
  {id:50,name:"Vinicola Valle 50",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.0,lng:-116.69999999999999,michelin:0,reservation:false},
  {id:51,name:"Vinicola Valle 51",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.001999999999995,lng:-116.702,michelin:0,reservation:false},
  {id:52,name:"Vinicola Valle 52",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.004,lng:-116.704,michelin:0,reservation:false},
  {id:53,name:"Vinicola Valle 53",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.006,lng:-116.70599999999999,michelin:0,reservation:false},
  {id:54,name:"Vinicola Valle 54",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.007999999999996,lng:-116.708,michelin:0,reservation:false},
  {id:55,name:"Vinicola Valle 55",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.01,lng:-116.71,michelin:0,reservation:false},
  {id:56,name:"Vinicola Valle 56",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.012,lng:-116.71199999999999,michelin:0,reservation:false},
  {id:57,name:"Vinicola Valle 57",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.013999999999996,lng:-116.714,michelin:0,reservation:false},
  {id:58,name:"Vinicola Valle 58",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.016,lng:-116.716,michelin:0,reservation:false},
  {id:59,name:"Vinicola Valle 59",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.018,lng:-116.71799999999999,michelin:0,reservation:false},
  {id:60,name:"Vinicola Valle 60",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.019999999999996,lng:-116.72,michelin:0,reservation:false},
  {id:61,name:"Vinicola Valle 61",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.022,lng:-116.722,michelin:0,reservation:false},
  {id:62,name:"Vinicola Valle 62",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.024,lng:-116.72399999999999,michelin:0,reservation:false},
  {id:63,name:"Vinicola Valle 63",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.025999999999996,lng:-116.726,michelin:0,reservation:false},
  {id:64,name:"Vinicola Valle 64",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.028,lng:-116.728,michelin:0,reservation:false},
  {id:65,name:"Vinicola Valle 65",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.03,lng:-116.72999999999999,michelin:0,reservation:false},
  {id:66,name:"Vinicola Valle 66",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.032,lng:-116.732,michelin:0,reservation:false},
  {id:67,name:"Vinicola Valle 67",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.034,lng:-116.734,michelin:0,reservation:false},
  {id:68,name:"Vinicola Valle 68",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.036,lng:-116.73599999999999,michelin:0,reservation:false},
  {id:69,name:"Vinicola Valle 69",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.038,lng:-116.738,michelin:0,reservation:false},
  {id:70,name:"Vinicola Valle 70",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.04,lng:-116.74,michelin:0,reservation:false},
  {id:71,name:"Vinicola Valle 71",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.042,lng:-116.74199999999999,michelin:0,reservation:false},
  {id:72,name:"Vinicola Valle 72",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.044,lng:-116.744,michelin:0,reservation:false},
  {id:73,name:"Vinicola Valle 73",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.046,lng:-116.746,michelin:0,reservation:false},
  {id:74,name:"Vinicola Valle 74",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.048,lng:-116.74799999999999,michelin:0,reservation:false},
  {id:75,name:"Vinicola Valle 75",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.05,lng:-116.75,michelin:0,reservation:false},
  {id:76,name:"Vinicola Valle 76",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.052,lng:-116.752,michelin:0,reservation:false},
  {id:77,name:"Vinicola Valle 77",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.054,lng:-116.75399999999999,michelin:0,reservation:false},
  {id:78,name:"Vinicola Valle 78",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.056,lng:-116.756,michelin:0,reservation:false},
  {id:79,name:"Vinicola Valle 79",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.058,lng:-116.758,michelin:0,reservation:false},
  {id:80,name:"Vinicola Valle 80",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.059999999999995,lng:-116.75999999999999,michelin:0,reservation:false},
  {id:81,name:"Vinicola Valle 81",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.062,lng:-116.762,michelin:0,reservation:false},
  {id:82,name:"Vinicola Valle 82",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.064,lng:-116.764,michelin:0,reservation:false},
  {id:83,name:"Vinicola Valle 83",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.065999999999995,lng:-116.76599999999999,michelin:0,reservation:false},
  {id:84,name:"Vinicola Valle 84",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.068,lng:-116.768,michelin:0,reservation:false},
  {id:85,name:"Vinicola Valle 85",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.07,lng:-116.77,michelin:0,reservation:false},
  {id:86,name:"Vinicola Valle 86",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.071999999999996,lng:-116.77199999999999,michelin:0,reservation:false},
  {id:87,name:"Vinicola Valle 87",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.074,lng:-116.774,michelin:0,reservation:false},
  {id:88,name:"Vinicola Valle 88",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.076,lng:-116.776,michelin:0,reservation:false},
  {id:89,name:"Vinicola Valle 89",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.077999999999996,lng:-116.77799999999999,michelin:0,reservation:false},
  {id:90,name:"Vinicola Valle 90",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.08,lng:-116.78,michelin:0,reservation:false},
  {id:91,name:"Vinicola Valle 91",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.082,lng:-116.782,michelin:0,reservation:false},
  {id:92,name:"Vinicola Valle 92",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.083999999999996,lng:-116.78399999999999,michelin:0,reservation:false},
  {id:93,name:"Vinicola Valle 93",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.086,lng:-116.786,michelin:0,reservation:false},
  {id:94,name:"Vinicola Valle 94",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.088,lng:-116.788,michelin:0,reservation:false},
  {id:95,name:"Vinicola Valle 95",type:"winery",category:"Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium Valle de Guadalupe winery. Quality wines and tastings.",phone:"+52 646 156 8000",price:"$$",fee:25,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:32.089999999999996,lng:-116.78999999999999,michelin:0,reservation:false},
  {id:101,name:"Animalon",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin Star. Oak tree. Javier Plascencia.",phone:"+52 646 156 8090",price:"$$$$",fee:120,website:"animalon.mx",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.91,lng:-116.63,michelin:1,reservation:true},
  {id:102,name:"Damiana",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin Star. Esteban Lluis. Daily menu.",phone:"+52 646 156 8015",price:"$$$$",fee:110,website:"vinedosdelareina.com",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.918,lng:-116.628,michelin:1,reservation:true},
  {id:103,name:"Conchas de Piedra",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"San Antonio",description:"Michelin Star + Green. Drew Deckman seafood.",phone:"+52 646 178 3445",price:"$$$$",fee:100,website:"conchasdepiedra.com",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.89,lng:-116.67,michelin:1,reservation:true},
  {id:104,name:"Lunario",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin Star + Green. Moon phase menu.",phone:"+52 646 155 3650",price:"$$$$",fee:110,website:"haciendalalomita.com",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.933,lng:-116.611,michelin:1,reservation:true},
  {id:105,name:"Olivea Farm to Table",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"NEW 2025 Michelin Star + Green. Organic.",phone:"+52 646 156 8200",price:"$$$$",fee:105,website:"olivea.mx",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.924,lng:-116.619,michelin:1,reservation:true},
  {id:106,name:"Deckman's en el Mogor",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin recommended. Green Star. Outdoor kitchen.",phone:"+52 646 188 3960",price:"$$$",fee:85,website:"deckmans.com",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.935,lng:-116.612,michelin:0,reservation:true},
  {id:107,name:"Fauna",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"At Bruma. Minimalist. Seasonal tasting menu.",phone:"+52 646 156 8338",price:"$$$$",fee:120,website:"bruma.mx",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.928,lng:-116.618,michelin:0,reservation:true},
  {id:108,name:"Restaurante Laja",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Chef Jair Tellez. Farm-to-table pioneer.",phone:"+52 646 155 2556",price:"$$$",fee:90,website:"laja.com.mx",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.932,lng:-116.615,michelin:0,reservation:true},
  {id:109,name:"Corazon de Tierra",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Chef Diego Hernandez. Organic garden.",phone:"+52 646 156 8030",price:"$$$",fee:95,website:"corazondetierra.com",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.927,lng:-116.619,michelin:0,reservation:true},
  {id:110,name:"Primitivo",type:"restaurant",category:"Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Fire pit under 300-year oak. Rustic elegance.",phone:"+52 646 156 8960",price:"$$$",fee:80,website:"primitivo.mx",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.919,lng:-116.624,michelin:0,reservation:true},
  {id:111,name:"Restaurant 111",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2111",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.11,lng:-110.11,michelin:0,reservation:true},
  {id:112,name:"Restaurant 112",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2112",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.12,lng:-110.12,michelin:0,reservation:true},
  {id:113,name:"Restaurant 113",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2113",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.13,lng:-110.13,michelin:0,reservation:true},
  {id:114,name:"Restaurant 114",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2114",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.14,lng:-110.14,michelin:0,reservation:true},
  {id:115,name:"Restaurant 115",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2115",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.15,lng:-110.15,michelin:0,reservation:true},
  {id:116,name:"Restaurant 116",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2116",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.16,lng:-110.16,michelin:0,reservation:true},
  {id:117,name:"Restaurant 117",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2117",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.17,lng:-110.17,michelin:0,reservation:true},
  {id:118,name:"Restaurant 118",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2118",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.18,lng:-110.18,michelin:0,reservation:true},
  {id:119,name:"Restaurant 119",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2119",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.19,lng:-110.19,michelin:0,reservation:true},
  {id:120,name:"Restaurant 120",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2120",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.2,lng:-110.2,michelin:0,reservation:true},
  {id:121,name:"Restaurant 121",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2121",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.21,lng:-110.21,michelin:0,reservation:true},
  {id:122,name:"Restaurant 122",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2122",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.22,lng:-110.22,michelin:0,reservation:true},
  {id:123,name:"Restaurant 123",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2123",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.23,lng:-110.23,michelin:0,reservation:true},
  {id:124,name:"Restaurant 124",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2124",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.24,lng:-110.24,michelin:0,reservation:true},
  {id:125,name:"Restaurant 125",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2125",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.25,lng:-110.25,michelin:0,reservation:true},
  {id:126,name:"Restaurant 126",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2126",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.26,lng:-110.26,michelin:0,reservation:true},
  {id:127,name:"Restaurant 127",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2127",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.27,lng:-110.27,michelin:0,reservation:true},
  {id:128,name:"Restaurant 128",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2128",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.28,lng:-110.28,michelin:0,reservation:true},
  {id:129,name:"Restaurant 129",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2129",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.29,lng:-110.29,michelin:0,reservation:true},
  {id:130,name:"Restaurant 130",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2130",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.3,lng:-110.3,michelin:0,reservation:true},
  {id:131,name:"Restaurant 131",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2131",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.31,lng:-110.31,michelin:0,reservation:true},
  {id:132,name:"Restaurant 132",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2132",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.32,lng:-110.32,michelin:0,reservation:true},
  {id:133,name:"Restaurant 133",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2133",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.33,lng:-110.33,michelin:0,reservation:true},
  {id:134,name:"Restaurant 134",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2134",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.34,lng:-110.34,michelin:0,reservation:true},
  {id:135,name:"Restaurant 135",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2135",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.35,lng:-110.35,michelin:0,reservation:true},
  {id:136,name:"Restaurant 136",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2136",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.36,lng:-110.36,michelin:0,reservation:true},
  {id:137,name:"Restaurant 137",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2137",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.37,lng:-110.37,michelin:0,reservation:true},
  {id:138,name:"Restaurant 138",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2138",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.38,lng:-110.38,michelin:0,reservation:true},
  {id:139,name:"Restaurant 139",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2139",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.39,lng:-110.39,michelin:0,reservation:true},
  {id:140,name:"Restaurant 140",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2140",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.4,lng:-110.4,michelin:0,reservation:true},
  {id:141,name:"Restaurant 141",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2141",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.41,lng:-110.41,michelin:0,reservation:true},
  {id:142,name:"Restaurant 142",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2142",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.42,lng:-110.42,michelin:0,reservation:true},
  {id:143,name:"Restaurant 143",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2143",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.43,lng:-110.43,michelin:0,reservation:true},
  {id:144,name:"Restaurant 144",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2144",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.44,lng:-110.44,michelin:0,reservation:true},
  {id:145,name:"Restaurant 145",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2145",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.45,lng:-110.45,michelin:0,reservation:true},
  {id:146,name:"Restaurant 146",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2146",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.46,lng:-110.46,michelin:0,reservation:true},
  {id:147,name:"Restaurant 147",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2147",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.47,lng:-110.47,michelin:0,reservation:true},
  {id:148,name:"Restaurant 148",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2148",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.48,lng:-110.48,michelin:0,reservation:true},
  {id:149,name:"Restaurant 149",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2149",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.49,lng:-110.49,michelin:0,reservation:true},
  {id:150,name:"Restaurant 150",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2150",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.5,lng:-110.5,michelin:0,reservation:true},
  {id:151,name:"Restaurant 151",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2151",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.51,lng:-110.51,michelin:0,reservation:true},
  {id:152,name:"Restaurant 152",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2152",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.52,lng:-110.52,michelin:0,reservation:true},
  {id:153,name:"Restaurant 153",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2153",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.53,lng:-110.53,michelin:0,reservation:true},
  {id:154,name:"Restaurant 154",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2154",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.54,lng:-110.54,michelin:0,reservation:true},
  {id:155,name:"Restaurant 155",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2155",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.55,lng:-110.55,michelin:0,reservation:true},
  {id:156,name:"Restaurant 156",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2156",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.56,lng:-110.56,michelin:0,reservation:true},
  {id:157,name:"Restaurant 157",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2157",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.57,lng:-110.57,michelin:0,reservation:true},
  {id:158,name:"Restaurant 158",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2158",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.58,lng:-110.58,michelin:0,reservation:true},
  {id:159,name:"Restaurant 159",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2159",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.59,lng:-110.59,michelin:0,reservation:true},
  {id:160,name:"Restaurant 160",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2160",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.6,lng:-110.6,michelin:0,reservation:true},
  {id:161,name:"Restaurant 161",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2161",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.61,lng:-110.61,michelin:0,reservation:true},
  {id:162,name:"Restaurant 162",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2162",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.62,lng:-110.62,michelin:0,reservation:true},
  {id:163,name:"Restaurant 163",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2163",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.63,lng:-110.63,michelin:0,reservation:true},
  {id:164,name:"Restaurant 164",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2164",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.64,lng:-110.64,michelin:0,reservation:true},
  {id:165,name:"Restaurant 165",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2165",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.65,lng:-110.65,michelin:0,reservation:true},
  {id:166,name:"Restaurant 166",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2166",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.66,lng:-110.66,michelin:0,reservation:true},
  {id:167,name:"Restaurant 167",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2167",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.67,lng:-110.67,michelin:0,reservation:true},
  {id:168,name:"Restaurant 168",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2168",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.68,lng:-110.68,michelin:0,reservation:true},
  {id:169,name:"Restaurant 169",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2169",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.69,lng:-110.69,michelin:0,reservation:true},
  {id:170,name:"Restaurant 170",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2170",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.7,lng:-110.7,michelin:0,reservation:true},
  {id:171,name:"Restaurant 171",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2171",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.71,lng:-110.71,michelin:0,reservation:true},
  {id:172,name:"Restaurant 172",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2172",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.72,lng:-110.72,michelin:0,reservation:true},
  {id:173,name:"Restaurant 173",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2173",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.73,lng:-110.73,michelin:0,reservation:true},
  {id:174,name:"Restaurant 174",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2174",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.74,lng:-110.74,michelin:0,reservation:true},
  {id:175,name:"Restaurant 175",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2175",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.75,lng:-110.75,michelin:0,reservation:true},
  {id:176,name:"Restaurant 176",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2176",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.76,lng:-110.76,michelin:0,reservation:true},
  {id:177,name:"Restaurant 177",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2177",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.77,lng:-110.77,michelin:0,reservation:true},
  {id:178,name:"Restaurant 178",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2178",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.78,lng:-110.78,michelin:0,reservation:true},
  {id:179,name:"Restaurant 179",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2179",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.79,lng:-110.79,michelin:0,reservation:true},
  {id:180,name:"Restaurant 180",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2180",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.8,lng:-110.8,michelin:0,reservation:true},
  {id:181,name:"Restaurant 181",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2181",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.81,lng:-110.81,michelin:0,reservation:true},
  {id:182,name:"Restaurant 182",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2182",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.82,lng:-110.82,michelin:0,reservation:true},
  {id:183,name:"Restaurant 183",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2183",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.83,lng:-110.83,michelin:0,reservation:true},
  {id:184,name:"Restaurant 184",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2184",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.84,lng:-110.84,michelin:0,reservation:true},
  {id:185,name:"Restaurant 185",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2185",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.85,lng:-110.85,michelin:0,reservation:true},
  {id:186,name:"Restaurant 186",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2186",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.86,lng:-110.86,michelin:0,reservation:true},
  {id:187,name:"Restaurant 187",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2187",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.87,lng:-110.87,michelin:0,reservation:true},
  {id:188,name:"Restaurant 188",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2188",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.88,lng:-110.88,michelin:0,reservation:true},
  {id:189,name:"Restaurant 189",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2189",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.89,lng:-110.89,michelin:0,reservation:true},
  {id:190,name:"Restaurant 190",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2190",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.9,lng:-110.9,michelin:0,reservation:true},
  {id:191,name:"Restaurant 191",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2191",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.91,lng:-110.91,michelin:0,reservation:true},
  {id:192,name:"Restaurant 192",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2192",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.92,lng:-110.92,michelin:0,reservation:true},
  {id:193,name:"Restaurant 193",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2193",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.93,lng:-110.93,michelin:0,reservation:true},
  {id:194,name:"Restaurant 194",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2194",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.94,lng:-110.94,michelin:0,reservation:true},
  {id:195,name:"Restaurant 195",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2195",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.95,lng:-110.95,michelin:0,reservation:true},
  {id:196,name:"Restaurant 196",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Exceptional dining in Tijuana. Fresh local ingredients.",phone:"+52 664 178 2196",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.96,lng:-110.96,michelin:0,reservation:true},
  {id:197,name:"Restaurant 197",type:"restaurant",category:"Fine Dining",region:"Rosarito",city:"Rosarito",description:"Exceptional dining in Rosarito. Fresh local ingredients.",phone:"+52 661 178 2197",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.97,lng:-110.97,michelin:0,reservation:true},
  {id:198,name:"Restaurant 198",type:"restaurant",category:"Fine Dining",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exceptional dining in Cabo San Lucas. Fresh local ingredients.",phone:"+52 624 178 2198",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.98,lng:-110.98,michelin:0,reservation:true},
  {id:199,name:"Restaurant 199",type:"restaurant",category:"Fine Dining",region:"La Paz",city:"La Paz",description:"Exceptional dining in La Paz. Fresh local ingredients.",phone:"+52 612 178 2199",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:23.99,lng:-110.99,michelin:0,reservation:true},
  {id:200,name:"Restaurant 200",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Exceptional dining in Ensenada. Fresh local ingredients.",phone:"+52 646 178 2200",price:"$$$",fee:75,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:24.0,lng:-111.0,michelin:0,reservation:true},
  {id:201,name:"One&Only Palmilla",type:"hotel",category:"Luxury Resort",region:"Los Cabos",city:"San Jose del Cabo",description:"Ultra-luxury. Butler service. $800-5000/night.",phone:"+52 624 146 7000",price:"$$$$",fee:800,website:"oneandonlyresorts.com",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.034,lng:-109.7008,michelin:0,reservation:true},
  {id:202,name:"Las Ventanas al Paraiso",type:"hotel",category:"Luxury Resort",region:"Los Cabos",city:"San Jose del Cabo",description:"Rosewood. Telescope service. $1200-8000/night.",phone:"+52 624 144 2800",price:"$$$$",fee:1200,website:"rosewoodhotels.com",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.02,lng:-109.71,michelin:0,reservation:true},
  {id:203,name:"Capella Pedregal",type:"hotel",category:"Luxury Resort",region:"Los Cabos",city:"Cabo San Lucas",description:"Private tunnel. Cliffside. $1000-10000/night.",phone:"+52 624 163 4300",price:"$$$$",fee:1000,website:"capellahotels.com",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:22.89,lng:-109.91,michelin:0,reservation:true},
  {id:204,name:"Nobu Hotel",type:"hotel",category:"Luxury Resort",region:"Los Cabos",city:"Cabo San Lucas",description:"Celebrity brand. Japanese luxury. $600-3000/night.",phone:"+52 624 689 0000",price:"$$$$",fee:600,website:"nobuhotels.com",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.01,lng:-109.7,michelin:0,reservation:true},
  {id:205,name:"Montage Los Cabos",type:"hotel",category:"Luxury Resort",region:"Los Cabos",city:"Cabo San Lucas",description:"Five-star. Santa Maria Bay. $800-4000/night.",phone:"+52 624 163 2000",price:"$$$$",fee:800,website:"montagehotels.com",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.03,lng:-109.72,michelin:0,reservation:true},
  {id:206,name:"Hotel 206",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.206,lng:-109.906,michelin:0,reservation:true},
  {id:207,name:"Hotel 207",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.207,lng:-109.907,michelin:0,reservation:true},
  {id:208,name:"Hotel 208",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.208,lng:-109.908,michelin:0,reservation:true},
  {id:209,name:"Hotel 209",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.209,lng:-109.909,michelin:0,reservation:true},
  {id:210,name:"Hotel 210",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.21,lng:-109.91,michelin:0,reservation:true},
  {id:211,name:"Hotel 211",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.211,lng:-109.911,michelin:0,reservation:true},
  {id:212,name:"Hotel 212",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.212,lng:-109.912,michelin:0,reservation:true},
  {id:213,name:"Hotel 213",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.213,lng:-109.913,michelin:0,reservation:true},
  {id:214,name:"Hotel 214",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.214,lng:-109.914,michelin:0,reservation:true},
  {id:215,name:"Hotel 215",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.215,lng:-109.915,michelin:0,reservation:true},
  {id:216,name:"Hotel 216",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.216,lng:-109.916,michelin:0,reservation:true},
  {id:217,name:"Hotel 217",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.217,lng:-109.917,michelin:0,reservation:true},
  {id:218,name:"Hotel 218",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.218,lng:-109.918,michelin:0,reservation:true},
  {id:219,name:"Hotel 219",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.219,lng:-109.919,michelin:0,reservation:true},
  {id:220,name:"Hotel 220",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.22,lng:-109.92,michelin:0,reservation:true},
  {id:221,name:"Hotel 221",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.221,lng:-109.921,michelin:0,reservation:true},
  {id:222,name:"Hotel 222",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.222,lng:-109.922,michelin:0,reservation:true},
  {id:223,name:"Hotel 223",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.223,lng:-109.923,michelin:0,reservation:true},
  {id:224,name:"Hotel 224",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.224,lng:-109.924,michelin:0,reservation:true},
  {id:225,name:"Hotel 225",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.225,lng:-109.925,michelin:0,reservation:true},
  {id:226,name:"Hotel 226",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.226,lng:-109.926,michelin:0,reservation:true},
  {id:227,name:"Hotel 227",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.227,lng:-109.927,michelin:0,reservation:true},
  {id:228,name:"Hotel 228",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.228,lng:-109.928,michelin:0,reservation:true},
  {id:229,name:"Hotel 229",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.229,lng:-109.929,michelin:0,reservation:true},
  {id:230,name:"Hotel 230",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.23,lng:-109.93,michelin:0,reservation:true},
  {id:231,name:"Hotel 231",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.231,lng:-109.931,michelin:0,reservation:true},
  {id:232,name:"Hotel 232",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.232,lng:-109.932,michelin:0,reservation:true},
  {id:233,name:"Hotel 233",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.233,lng:-109.933,michelin:0,reservation:true},
  {id:234,name:"Hotel 234",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.234,lng:-109.934,michelin:0,reservation:true},
  {id:235,name:"Hotel 235",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.235,lng:-109.935,michelin:0,reservation:true},
  {id:236,name:"Hotel 236",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.236,lng:-109.936,michelin:0,reservation:true},
  {id:237,name:"Hotel 237",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.237,lng:-109.937,michelin:0,reservation:true},
  {id:238,name:"Hotel 238",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.238,lng:-109.938,michelin:0,reservation:true},
  {id:239,name:"Hotel 239",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.239,lng:-109.93900000000001,michelin:0,reservation:true},
  {id:240,name:"Hotel 240",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.24,lng:-109.94,michelin:0,reservation:true},
  {id:241,name:"Hotel 241",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.241,lng:-109.941,michelin:0,reservation:true},
  {id:242,name:"Hotel 242",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.242,lng:-109.94200000000001,michelin:0,reservation:true},
  {id:243,name:"Hotel 243",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.243,lng:-109.943,michelin:0,reservation:true},
  {id:244,name:"Hotel 244",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.244,lng:-109.944,michelin:0,reservation:true},
  {id:245,name:"Hotel 245",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.245,lng:-109.94500000000001,michelin:0,reservation:true},
  {id:246,name:"Hotel 246",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.246,lng:-109.946,michelin:0,reservation:true},
  {id:247,name:"Hotel 247",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.247,lng:-109.947,michelin:0,reservation:true},
  {id:248,name:"Hotel 248",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.248,lng:-109.94800000000001,michelin:0,reservation:true},
  {id:249,name:"Hotel 249",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.249,lng:-109.949,michelin:0,reservation:true},
  {id:250,name:"Hotel 250",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.25,lng:-109.95,michelin:0,reservation:true},
  {id:251,name:"Hotel 251",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.251,lng:-109.95100000000001,michelin:0,reservation:true},
  {id:252,name:"Hotel 252",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.252,lng:-109.952,michelin:0,reservation:true},
  {id:253,name:"Hotel 253",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.253,lng:-109.953,michelin:0,reservation:true},
  {id:254,name:"Hotel 254",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.254,lng:-109.95400000000001,michelin:0,reservation:true},
  {id:255,name:"Hotel 255",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.255,lng:-109.955,michelin:0,reservation:true},
  {id:256,name:"Hotel 256",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.256,lng:-109.956,michelin:0,reservation:true},
  {id:257,name:"Hotel 257",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.257,lng:-109.95700000000001,michelin:0,reservation:true},
  {id:258,name:"Hotel 258",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.258,lng:-109.958,michelin:0,reservation:true},
  {id:259,name:"Hotel 259",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.259,lng:-109.959,michelin:0,reservation:true},
  {id:260,name:"Hotel 260",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.26,lng:-109.96000000000001,michelin:0,reservation:true},
  {id:261,name:"Hotel 261",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.261,lng:-109.961,michelin:0,reservation:true},
  {id:262,name:"Hotel 262",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.262,lng:-109.962,michelin:0,reservation:true},
  {id:263,name:"Hotel 263",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.263,lng:-109.96300000000001,michelin:0,reservation:true},
  {id:264,name:"Hotel 264",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.264,lng:-109.964,michelin:0,reservation:true},
  {id:265,name:"Hotel 265",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.265,lng:-109.965,michelin:0,reservation:true},
  {id:266,name:"Hotel 266",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.266,lng:-109.96600000000001,michelin:0,reservation:true},
  {id:267,name:"Hotel 267",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.267,lng:-109.967,michelin:0,reservation:true},
  {id:268,name:"Hotel 268",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.268,lng:-109.968,michelin:0,reservation:true},
  {id:269,name:"Hotel 269",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.269,lng:-109.96900000000001,michelin:0,reservation:true},
  {id:270,name:"Hotel 270",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.27,lng:-109.97,michelin:0,reservation:true},
  {id:271,name:"Hotel 271",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.271,lng:-109.971,michelin:0,reservation:true},
  {id:272,name:"Hotel 272",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.272,lng:-109.97200000000001,michelin:0,reservation:true},
  {id:273,name:"Hotel 273",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.273,lng:-109.973,michelin:0,reservation:true},
  {id:274,name:"Hotel 274",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.274,lng:-109.974,michelin:0,reservation:true},
  {id:275,name:"Hotel 275",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.275,lng:-109.97500000000001,michelin:0,reservation:true},
  {id:276,name:"Hotel 276",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.276,lng:-109.976,michelin:0,reservation:true},
  {id:277,name:"Hotel 277",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.277,lng:-109.977,michelin:0,reservation:true},
  {id:278,name:"Hotel 278",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.278,lng:-109.97800000000001,michelin:0,reservation:true},
  {id:279,name:"Hotel 279",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.279,lng:-109.979,michelin:0,reservation:true},
  {id:280,name:"Hotel 280",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.28,lng:-109.98,michelin:0,reservation:true},
  {id:281,name:"Hotel 281",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.281,lng:-109.98100000000001,michelin:0,reservation:true},
  {id:282,name:"Hotel 282",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.282,lng:-109.982,michelin:0,reservation:true},
  {id:283,name:"Hotel 283",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.283,lng:-109.983,michelin:0,reservation:true},
  {id:284,name:"Hotel 284",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.284,lng:-109.98400000000001,michelin:0,reservation:true},
  {id:285,name:"Hotel 285",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.285,lng:-109.985,michelin:0,reservation:true},
  {id:286,name:"Hotel 286",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.286,lng:-109.986,michelin:0,reservation:true},
  {id:287,name:"Hotel 287",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.287,lng:-109.98700000000001,michelin:0,reservation:true},
  {id:288,name:"Hotel 288",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.288,lng:-109.988,michelin:0,reservation:true},
  {id:289,name:"Hotel 289",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.289,lng:-109.989,michelin:0,reservation:true},
  {id:290,name:"Hotel 290",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.29,lng:-109.99000000000001,michelin:0,reservation:true},
  {id:291,name:"Hotel 291",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.291,lng:-109.991,michelin:0,reservation:true},
  {id:292,name:"Hotel 292",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.292,lng:-109.992,michelin:0,reservation:true},
  {id:293,name:"Hotel 293",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.293,lng:-109.99300000000001,michelin:0,reservation:true},
  {id:294,name:"Hotel 294",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.294,lng:-109.994,michelin:0,reservation:true},
  {id:295,name:"Hotel 295",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.295,lng:-109.995,michelin:0,reservation:true},
  {id:296,name:"Hotel 296",type:"hotel",category:"Luxury Resort",region:"Ensenada",city:"Ensenada",description:"Premium resort in Ensenada. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.296,lng:-109.99600000000001,michelin:0,reservation:true},
  {id:297,name:"Hotel 297",type:"hotel",category:"Luxury Resort",region:"La Paz",city:"La Paz",description:"Premium resort in La Paz. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.297,lng:-109.997,michelin:0,reservation:true},
  {id:298,name:"Hotel 298",type:"hotel",category:"Luxury Resort",region:"Todos Santos",city:"Todos Santos",description:"Premium resort in Todos Santos. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.298,lng:-109.998,michelin:0,reservation:true},
  {id:299,name:"Hotel 299",type:"hotel",category:"Luxury Resort",region:"Rosarito",city:"Rosarito",description:"Premium resort in Rosarito. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.299,lng:-109.99900000000001,michelin:0,reservation:true},
  {id:300,name:"Hotel 300",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium resort in Cabo San Lucas. Ocean views and world-class service.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:23.3,lng:-110.0,michelin:0,reservation:true},
  {id:301,name:"Golf Course 301",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.200999999999997,lng:-110.151,michelin:0,reservation:true},
  {id:302,name:"Golf Course 302",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.201999999999998,lng:-110.152,michelin:0,reservation:true},
  {id:303,name:"Golf Course 303",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.203,lng:-110.15299999999999,michelin:0,reservation:true},
  {id:304,name:"Golf Course 304",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.203999999999997,lng:-110.154,michelin:0,reservation:true},
  {id:305,name:"Golf Course 305",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.205,lng:-110.155,michelin:0,reservation:true},
  {id:306,name:"Golf Course 306",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.206,lng:-110.15599999999999,michelin:0,reservation:true},
  {id:307,name:"Golf Course 307",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.206999999999997,lng:-110.157,michelin:0,reservation:true},
  {id:308,name:"Golf Course 308",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.208,lng:-110.158,michelin:0,reservation:true},
  {id:309,name:"Golf Course 309",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.209,lng:-110.15899999999999,michelin:0,reservation:true},
  {id:310,name:"Golf Course 310",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.209999999999997,lng:-110.16,michelin:0,reservation:true},
  {id:311,name:"Golf Course 311",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.211,lng:-110.161,michelin:0,reservation:true},
  {id:312,name:"Golf Course 312",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.212,lng:-110.16199999999999,michelin:0,reservation:true},
  {id:313,name:"Golf Course 313",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.212999999999997,lng:-110.163,michelin:0,reservation:true},
  {id:314,name:"Golf Course 314",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.214,lng:-110.16399999999999,michelin:0,reservation:true},
  {id:315,name:"Golf Course 315",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.215,lng:-110.16499999999999,michelin:0,reservation:true},
  {id:316,name:"Golf Course 316",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.215999999999998,lng:-110.166,michelin:0,reservation:true},
  {id:317,name:"Golf Course 317",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.217,lng:-110.16699999999999,michelin:0,reservation:true},
  {id:318,name:"Golf Course 318",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.218,lng:-110.16799999999999,michelin:0,reservation:true},
  {id:319,name:"Golf Course 319",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.218999999999998,lng:-110.169,michelin:0,reservation:true},
  {id:320,name:"Golf Course 320",type:"golf",category:"Championship",region:"Los Cabos",city:"Cabo San Lucas",description:"Championship golf course with ocean views. Professional design.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",lat:23.22,lng:-110.16999999999999,michelin:0,reservation:true},
  {id:321,name:"Cerveceria 321",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.171,lng:-116.92099999999999,michelin:0,reservation:false},
  {id:322,name:"Cerveceria 322",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.172000000000004,lng:-116.922,michelin:0,reservation:false},
  {id:323,name:"Cerveceria 323",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.173,lng:-116.92299999999999,michelin:0,reservation:false},
  {id:324,name:"Cerveceria 324",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.174,lng:-116.92399999999999,michelin:0,reservation:false},
  {id:325,name:"Cerveceria 325",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.175000000000004,lng:-116.925,michelin:0,reservation:false},
  {id:326,name:"Cerveceria 326",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.176,lng:-116.92599999999999,michelin:0,reservation:false},
  {id:327,name:"Cerveceria 327",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.177,lng:-116.92699999999999,michelin:0,reservation:false},
  {id:328,name:"Cerveceria 328",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.178000000000004,lng:-116.928,michelin:0,reservation:false},
  {id:329,name:"Cerveceria 329",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.179,lng:-116.92899999999999,michelin:0,reservation:false},
  {id:330,name:"Cerveceria 330",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.18,lng:-116.92999999999999,michelin:0,reservation:false},
  {id:331,name:"Cerveceria 331",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.181000000000004,lng:-116.931,michelin:0,reservation:false},
  {id:332,name:"Cerveceria 332",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.182,lng:-116.93199999999999,michelin:0,reservation:false},
  {id:333,name:"Cerveceria 333",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.183,lng:-116.93299999999999,michelin:0,reservation:false},
  {id:334,name:"Cerveceria 334",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.184000000000005,lng:-116.934,michelin:0,reservation:false},
  {id:335,name:"Cerveceria 335",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.185,lng:-116.93499999999999,michelin:0,reservation:false},
  {id:336,name:"Cerveceria 336",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.186,lng:-116.93599999999999,michelin:0,reservation:false},
  {id:337,name:"Cerveceria 337",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.187000000000005,lng:-116.937,michelin:0,reservation:false},
  {id:338,name:"Cerveceria 338",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.188,lng:-116.93799999999999,michelin:0,reservation:false},
  {id:339,name:"Cerveceria 339",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.189,lng:-116.939,michelin:0,reservation:false},
  {id:340,name:"Cerveceria 340",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.190000000000005,lng:-116.94,michelin:0,reservation:false},
  {id:341,name:"Cerveceria 341",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.191,lng:-116.94099999999999,michelin:0,reservation:false},
  {id:342,name:"Cerveceria 342",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.192,lng:-116.942,michelin:0,reservation:false},
  {id:343,name:"Cerveceria 343",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.193000000000005,lng:-116.943,michelin:0,reservation:false},
  {id:344,name:"Cerveceria 344",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.194,lng:-116.94399999999999,michelin:0,reservation:false},
  {id:345,name:"Cerveceria 345",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.195,lng:-116.945,michelin:0,reservation:false},
  {id:346,name:"Cerveceria 346",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.196,lng:-116.946,michelin:0,reservation:false},
  {id:347,name:"Cerveceria 347",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.197,lng:-116.94699999999999,michelin:0,reservation:false},
  {id:348,name:"Cerveceria 348",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.198,lng:-116.948,michelin:0,reservation:false},
  {id:349,name:"Cerveceria 349",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.199,lng:-116.949,michelin:0,reservation:false},
  {id:350,name:"Cerveceria 350",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.2,lng:-116.94999999999999,michelin:0,reservation:false},
  {id:351,name:"Cerveceria 351",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.201,lng:-116.951,michelin:0,reservation:false},
  {id:352,name:"Cerveceria 352",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.202,lng:-116.952,michelin:0,reservation:false},
  {id:353,name:"Cerveceria 353",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.203,lng:-116.95299999999999,michelin:0,reservation:false},
  {id:354,name:"Cerveceria 354",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.204,lng:-116.954,michelin:0,reservation:false},
  {id:355,name:"Cerveceria 355",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.205,lng:-116.955,michelin:0,reservation:false},
  {id:356,name:"Cerveceria 356",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.206,lng:-116.95599999999999,michelin:0,reservation:false},
  {id:357,name:"Cerveceria 357",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.207,lng:-116.957,michelin:0,reservation:false},
  {id:358,name:"Cerveceria 358",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.208,lng:-116.958,michelin:0,reservation:false},
  {id:359,name:"Cerveceria 359",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.209,lng:-116.95899999999999,michelin:0,reservation:false},
  {id:360,name:"Cerveceria 360",type:"brewery",category:"Craft Brewery",region:"Ensenada",city:"Ensenada",description:"Craft brewery with innovative beers. Tasting room and tours.",phone:"+52 646 178 2000",price:"$",fee:15,website:"",photo:"https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",lat:32.21,lng:-116.96,michelin:0,reservation:false},
  {id:361,name:"Spa 361",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.361,lng:-110.061,michelin:0,reservation:true},
  {id:362,name:"Spa 362",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.362,lng:-110.062,michelin:0,reservation:true},
  {id:363,name:"Spa 363",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.363,lng:-110.063,michelin:0,reservation:true},
  {id:364,name:"Spa 364",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.364,lng:-110.06400000000001,michelin:0,reservation:true},
  {id:365,name:"Spa 365",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.365,lng:-110.065,michelin:0,reservation:true},
  {id:366,name:"Spa 366",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.366,lng:-110.066,michelin:0,reservation:true},
  {id:367,name:"Spa 367",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.367,lng:-110.06700000000001,michelin:0,reservation:true},
  {id:368,name:"Spa 368",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.368,lng:-110.068,michelin:0,reservation:true},
  {id:369,name:"Spa 369",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.369,lng:-110.069,michelin:0,reservation:true},
  {id:370,name:"Spa 370",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.37,lng:-110.07000000000001,michelin:0,reservation:true},
  {id:371,name:"Spa 371",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.371,lng:-110.071,michelin:0,reservation:true},
  {id:372,name:"Spa 372",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.372,lng:-110.072,michelin:0,reservation:true},
  {id:373,name:"Spa 373",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.373,lng:-110.07300000000001,michelin:0,reservation:true},
  {id:374,name:"Spa 374",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.374,lng:-110.074,michelin:0,reservation:true},
  {id:375,name:"Spa 375",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.375,lng:-110.075,michelin:0,reservation:true},
  {id:376,name:"Spa 376",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.376,lng:-110.07600000000001,michelin:0,reservation:true},
  {id:377,name:"Spa 377",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.377,lng:-110.077,michelin:0,reservation:true},
  {id:378,name:"Spa 378",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.378,lng:-110.078,michelin:0,reservation:true},
  {id:379,name:"Spa 379",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.379,lng:-110.07900000000001,michelin:0,reservation:true},
  {id:380,name:"Spa 380",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.38,lng:-110.08,michelin:0,reservation:true},
  {id:381,name:"Spa 381",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.381,lng:-110.081,michelin:0,reservation:true},
  {id:382,name:"Spa 382",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.382,lng:-110.08200000000001,michelin:0,reservation:true},
  {id:383,name:"Spa 383",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.383,lng:-110.083,michelin:0,reservation:true},
  {id:384,name:"Spa 384",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.384,lng:-110.084,michelin:0,reservation:true},
  {id:385,name:"Spa 385",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.385,lng:-110.08500000000001,michelin:0,reservation:true},
  {id:386,name:"Spa 386",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.386,lng:-110.086,michelin:0,reservation:true},
  {id:387,name:"Spa 387",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.387,lng:-110.087,michelin:0,reservation:true},
  {id:388,name:"Spa 388",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.388,lng:-110.08800000000001,michelin:0,reservation:true},
  {id:389,name:"Spa 389",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.389,lng:-110.089,michelin:0,reservation:true},
  {id:390,name:"Spa 390",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.39,lng:-110.09,michelin:0,reservation:true},
  {id:391,name:"Spa 391",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.391,lng:-110.09100000000001,michelin:0,reservation:true},
  {id:392,name:"Spa 392",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.392,lng:-110.092,michelin:0,reservation:true},
  {id:393,name:"Spa 393",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.393,lng:-110.093,michelin:0,reservation:true},
  {id:394,name:"Spa 394",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.394,lng:-110.09400000000001,michelin:0,reservation:true},
  {id:395,name:"Spa 395",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.395,lng:-110.095,michelin:0,reservation:true},
  {id:396,name:"Spa 396",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.396,lng:-110.096,michelin:0,reservation:true},
  {id:397,name:"Spa 397",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.397,lng:-110.09700000000001,michelin:0,reservation:true},
  {id:398,name:"Spa 398",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.398,lng:-110.098,michelin:0,reservation:true},
  {id:399,name:"Spa 399",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.399,lng:-110.099,michelin:0,reservation:true},
  {id:400,name:"Spa 400",type:"spa",category:"Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-class spa with oceanview treatment rooms. Holistic therapies.",phone:"+52 624 163 4000",price:"$$$$",fee:300,website:"",photo:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",lat:23.4,lng:-110.10000000000001,michelin:0,reservation:true},
  {id:401,name:"Cigar Lounge 401",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.291,lng:-110.31099999999999,michelin:0,reservation:false},
  {id:402,name:"Cigar Lounge 402",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.292,lng:-110.312,michelin:0,reservation:false},
  {id:403,name:"Cigar Lounge 403",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.293,lng:-110.313,michelin:0,reservation:false},
  {id:404,name:"Cigar Lounge 404",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.294,lng:-110.314,michelin:0,reservation:false},
  {id:405,name:"Cigar Lounge 405",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.295,lng:-110.315,michelin:0,reservation:false},
  {id:406,name:"Cigar Lounge 406",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.296,lng:-110.316,michelin:0,reservation:false},
  {id:407,name:"Cigar Lounge 407",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.297,lng:-110.317,michelin:0,reservation:false},
  {id:408,name:"Cigar Lounge 408",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.298000000000002,lng:-110.318,michelin:0,reservation:false},
  {id:409,name:"Cigar Lounge 409",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.299,lng:-110.319,michelin:0,reservation:false},
  {id:410,name:"Cigar Lounge 410",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.3,lng:-110.32,michelin:0,reservation:false},
  {id:411,name:"Cigar Lounge 411",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.301000000000002,lng:-110.321,michelin:0,reservation:false},
  {id:412,name:"Cigar Lounge 412",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.302,lng:-110.322,michelin:0,reservation:false},
  {id:413,name:"Cigar Lounge 413",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.303,lng:-110.323,michelin:0,reservation:false},
  {id:414,name:"Cigar Lounge 414",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.304000000000002,lng:-110.324,michelin:0,reservation:false},
  {id:415,name:"Cigar Lounge 415",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.305,lng:-110.325,michelin:0,reservation:false},
  {id:416,name:"Cigar Lounge 416",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.306,lng:-110.326,michelin:0,reservation:false},
  {id:417,name:"Cigar Lounge 417",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.307000000000002,lng:-110.327,michelin:0,reservation:false},
  {id:418,name:"Cigar Lounge 418",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.308,lng:-110.328,michelin:0,reservation:false},
  {id:419,name:"Cigar Lounge 419",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.309,lng:-110.329,michelin:0,reservation:false},
  {id:420,name:"Cigar Lounge 420",type:"cigar-bar",category:"Premium Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar lounge. Cuban and Dominican selection. Ocean views.",phone:"+52 624 145 6000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1606403907087-2cc258e00c03?w=800&q=80",lat:23.310000000000002,lng:-110.33,michelin:0,reservation:false},
  {id:421,name:"Beach Club 421",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.301,lng:-110.34100000000001,michelin:0,reservation:true},
  {id:422,name:"Beach Club 422",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.302,lng:-110.342,michelin:0,reservation:true},
  {id:423,name:"Beach Club 423",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.302999999999997,lng:-110.343,michelin:0,reservation:true},
  {id:424,name:"Beach Club 424",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.304,lng:-110.34400000000001,michelin:0,reservation:true},
  {id:425,name:"Beach Club 425",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.305,lng:-110.345,michelin:0,reservation:true},
  {id:426,name:"Beach Club 426",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.305999999999997,lng:-110.346,michelin:0,reservation:true},
  {id:427,name:"Beach Club 427",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.307,lng:-110.34700000000001,michelin:0,reservation:true},
  {id:428,name:"Beach Club 428",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.308,lng:-110.348,michelin:0,reservation:true},
  {id:429,name:"Beach Club 429",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.308999999999997,lng:-110.349,michelin:0,reservation:true},
  {id:430,name:"Beach Club 430",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.31,lng:-110.35000000000001,michelin:0,reservation:true},
  {id:431,name:"Beach Club 431",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.311,lng:-110.351,michelin:0,reservation:true},
  {id:432,name:"Beach Club 432",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.311999999999998,lng:-110.352,michelin:0,reservation:true},
  {id:433,name:"Beach Club 433",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.313,lng:-110.35300000000001,michelin:0,reservation:true},
  {id:434,name:"Beach Club 434",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.314,lng:-110.354,michelin:0,reservation:true},
  {id:435,name:"Beach Club 435",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.314999999999998,lng:-110.355,michelin:0,reservation:true},
  {id:436,name:"Beach Club 436",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.316,lng:-110.35600000000001,michelin:0,reservation:true},
  {id:437,name:"Beach Club 437",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.317,lng:-110.357,michelin:0,reservation:true},
  {id:438,name:"Beach Club 438",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.317999999999998,lng:-110.358,michelin:0,reservation:true},
  {id:439,name:"Beach Club 439",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.319,lng:-110.359,michelin:0,reservation:true},
  {id:440,name:"Beach Club 440",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.32,lng:-110.36,michelin:0,reservation:true},
  {id:441,name:"Beach Club 441",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.320999999999998,lng:-110.361,michelin:0,reservation:true},
  {id:442,name:"Beach Club 442",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.322,lng:-110.362,michelin:0,reservation:true},
  {id:443,name:"Beach Club 443",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.323,lng:-110.363,michelin:0,reservation:true},
  {id:444,name:"Beach Club 444",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.323999999999998,lng:-110.364,michelin:0,reservation:true},
  {id:445,name:"Beach Club 445",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.325,lng:-110.365,michelin:0,reservation:true},
  {id:446,name:"Beach Club 446",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.326,lng:-110.366,michelin:0,reservation:true},
  {id:447,name:"Beach Club 447",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.326999999999998,lng:-110.367,michelin:0,reservation:true},
  {id:448,name:"Beach Club 448",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.328,lng:-110.368,michelin:0,reservation:true},
  {id:449,name:"Beach Club 449",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.329,lng:-110.369,michelin:0,reservation:true},
  {id:450,name:"Beach Club 450",type:"beach-club",category:"Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Exclusive beach club. Day beds, cabanas, full service. Pacific Ocean.",phone:"+52 624 143 0000",price:"$$$",fee:100,website:"",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",lat:23.33,lng:-110.37,michelin:0,reservation:true},
  {id:451,name:"Yacht Charter 451",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.341,lng:-110.36099999999999,michelin:0,reservation:true},
  {id:452,name:"Yacht Charter 452",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.342000000000002,lng:-110.362,michelin:0,reservation:true},
  {id:453,name:"Yacht Charter 453",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.343,lng:-110.363,michelin:0,reservation:true},
  {id:454,name:"Yacht Charter 454",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.344,lng:-110.36399999999999,michelin:0,reservation:true},
  {id:455,name:"Yacht Charter 455",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.345,lng:-110.365,michelin:0,reservation:true},
  {id:456,name:"Yacht Charter 456",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.346,lng:-110.366,michelin:0,reservation:true},
  {id:457,name:"Yacht Charter 457",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.347,lng:-110.36699999999999,michelin:0,reservation:true},
  {id:458,name:"Yacht Charter 458",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.348,lng:-110.368,michelin:0,reservation:true},
  {id:459,name:"Yacht Charter 459",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.349,lng:-110.369,michelin:0,reservation:true},
  {id:460,name:"Yacht Charter 460",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.35,lng:-110.36999999999999,michelin:0,reservation:true},
  {id:461,name:"Yacht Charter 461",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.351,lng:-110.371,michelin:0,reservation:true},
  {id:462,name:"Yacht Charter 462",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.352,lng:-110.372,michelin:0,reservation:true},
  {id:463,name:"Yacht Charter 463",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.353,lng:-110.37299999999999,michelin:0,reservation:true},
  {id:464,name:"Yacht Charter 464",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.354,lng:-110.374,michelin:0,reservation:true},
  {id:465,name:"Yacht Charter 465",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.355,lng:-110.375,michelin:0,reservation:true},
  {id:466,name:"Yacht Charter 466",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.356,lng:-110.37599999999999,michelin:0,reservation:true},
  {id:467,name:"Yacht Charter 467",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.357,lng:-110.377,michelin:0,reservation:true},
  {id:468,name:"Yacht Charter 468",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.358,lng:-110.378,michelin:0,reservation:true},
  {id:469,name:"Yacht Charter 469",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.359,lng:-110.37899999999999,michelin:0,reservation:true},
  {id:470,name:"Yacht Charter 470",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.36,lng:-110.38,michelin:0,reservation:true},
  {id:471,name:"Yacht Charter 471",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.361,lng:-110.381,michelin:0,reservation:true},
  {id:472,name:"Yacht Charter 472",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.362000000000002,lng:-110.38199999999999,michelin:0,reservation:true},
  {id:473,name:"Yacht Charter 473",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.363,lng:-110.383,michelin:0,reservation:true},
  {id:474,name:"Yacht Charter 474",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.364,lng:-110.384,michelin:0,reservation:true},
  {id:475,name:"Yacht Charter 475",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.365000000000002,lng:-110.38499999999999,michelin:0,reservation:true},
  {id:476,name:"Yacht Charter 476",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.366,lng:-110.386,michelin:0,reservation:true},
  {id:477,name:"Yacht Charter 477",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.367,lng:-110.387,michelin:0,reservation:true},
  {id:478,name:"Yacht Charter 478",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.368000000000002,lng:-110.38799999999999,michelin:0,reservation:true},
  {id:479,name:"Yacht Charter 479",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.369,lng:-110.389,michelin:0,reservation:true},
  {id:480,name:"Yacht Charter 480",type:"yacht",category:"Luxury Charter",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury yacht charters. Sportfishing, sunset cruises, private events.",phone:"+52 624 143 1250",price:"$$$$",fee:5000,website:"",photo:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",lat:23.37,lng:-110.39,michelin:0,reservation:true},
  {id:481,name:"Scuba Diving 481",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.481,lng:-116.481,michelin:0,reservation:true},
  {id:482,name:"Snorkeling 482",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.482,lng:-116.482,michelin:0,reservation:true},
  {id:483,name:"Kayaking 483",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.483,lng:-116.483,michelin:0,reservation:true},
  {id:484,name:"Surfing 484",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.484,lng:-116.484,michelin:0,reservation:true},
  {id:485,name:"Paddleboarding 485",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.485,lng:-116.485,michelin:0,reservation:true},
  {id:486,name:"Kitesurfing 486",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.486,lng:-116.486,michelin:0,reservation:true},
  {id:487,name:"Fishing 487",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.487,lng:-116.487,michelin:0,reservation:true},
  {id:488,name:"Sailing 488",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.488,lng:-116.488,michelin:0,reservation:true},
  {id:489,name:"ATV Tours 489",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.489,lng:-116.489,michelin:0,reservation:true},
  {id:490,name:"Whale Watching 490",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.49,lng:-116.49,michelin:0,reservation:true},
  {id:491,name:"Scuba Diving 491",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.491,lng:-116.491,michelin:0,reservation:true},
  {id:492,name:"Snorkeling 492",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.492,lng:-116.492,michelin:0,reservation:true},
  {id:493,name:"Kayaking 493",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.493,lng:-116.493,michelin:0,reservation:true},
  {id:494,name:"Surfing 494",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.494,lng:-116.494,michelin:0,reservation:true},
  {id:495,name:"Paddleboarding 495",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.495,lng:-116.495,michelin:0,reservation:true},
  {id:496,name:"Kitesurfing 496",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.496,lng:-116.496,michelin:0,reservation:true},
  {id:497,name:"Fishing 497",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.497,lng:-116.497,michelin:0,reservation:true},
  {id:498,name:"Sailing 498",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.498,lng:-116.498,michelin:0,reservation:true},
  {id:499,name:"ATV Tours 499",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.499,lng:-116.499,michelin:0,reservation:true},
  {id:500,name:"Whale Watching 500",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.5,lng:-116.5,michelin:0,reservation:true},
  {id:501,name:"Scuba Diving 501",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.501,lng:-116.501,michelin:0,reservation:true},
  {id:502,name:"Snorkeling 502",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.502,lng:-116.502,michelin:0,reservation:true},
  {id:503,name:"Kayaking 503",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.503,lng:-116.503,michelin:0,reservation:true},
  {id:504,name:"Surfing 504",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.504,lng:-116.504,michelin:0,reservation:true},
  {id:505,name:"Paddleboarding 505",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.505,lng:-116.505,michelin:0,reservation:true},
  {id:506,name:"Kitesurfing 506",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.506,lng:-116.506,michelin:0,reservation:true},
  {id:507,name:"Fishing 507",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.507,lng:-116.507,michelin:0,reservation:true},
  {id:508,name:"Sailing 508",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.508,lng:-116.508,michelin:0,reservation:true},
  {id:509,name:"ATV Tours 509",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.509,lng:-116.509,michelin:0,reservation:true},
  {id:510,name:"Whale Watching 510",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.51,lng:-116.51,michelin:0,reservation:true},
  {id:511,name:"Scuba Diving 511",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.511,lng:-116.511,michelin:0,reservation:true},
  {id:512,name:"Snorkeling 512",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.512,lng:-116.512,michelin:0,reservation:true},
  {id:513,name:"Kayaking 513",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.513,lng:-116.513,michelin:0,reservation:true},
  {id:514,name:"Surfing 514",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.514,lng:-116.514,michelin:0,reservation:true},
  {id:515,name:"Paddleboarding 515",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.515,lng:-116.515,michelin:0,reservation:true},
  {id:516,name:"Kitesurfing 516",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.516,lng:-116.516,michelin:0,reservation:true},
  {id:517,name:"Fishing 517",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.517,lng:-116.517,michelin:0,reservation:true},
  {id:518,name:"Sailing 518",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.518,lng:-116.518,michelin:0,reservation:true},
  {id:519,name:"ATV Tours 519",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.519,lng:-116.519,michelin:0,reservation:true},
  {id:520,name:"Whale Watching 520",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.52,lng:-116.52,michelin:0,reservation:true},
  {id:521,name:"Scuba Diving 521",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.521,lng:-116.521,michelin:0,reservation:true},
  {id:522,name:"Snorkeling 522",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.522,lng:-116.522,michelin:0,reservation:true},
  {id:523,name:"Kayaking 523",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.523,lng:-116.523,michelin:0,reservation:true},
  {id:524,name:"Surfing 524",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.524,lng:-116.524,michelin:0,reservation:true},
  {id:525,name:"Paddleboarding 525",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.525,lng:-116.525,michelin:0,reservation:true},
  {id:526,name:"Kitesurfing 526",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.526,lng:-116.526,michelin:0,reservation:true},
  {id:527,name:"Fishing 527",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.527,lng:-116.527,michelin:0,reservation:true},
  {id:528,name:"Sailing 528",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.528,lng:-116.528,michelin:0,reservation:true},
  {id:529,name:"ATV Tours 529",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.529,lng:-116.529,michelin:0,reservation:true},
  {id:530,name:"Whale Watching 530",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.53,lng:-116.53,michelin:0,reservation:true},
  {id:531,name:"Scuba Diving 531",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.531,lng:-116.531,michelin:0,reservation:true},
  {id:532,name:"Snorkeling 532",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.532,lng:-116.532,michelin:0,reservation:true},
  {id:533,name:"Kayaking 533",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.533,lng:-116.533,michelin:0,reservation:true},
  {id:534,name:"Surfing 534",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.534,lng:-116.534,michelin:0,reservation:true},
  {id:535,name:"Paddleboarding 535",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.535,lng:-116.535,michelin:0,reservation:true},
  {id:536,name:"Kitesurfing 536",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.536,lng:-116.536,michelin:0,reservation:true},
  {id:537,name:"Fishing 537",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.537,lng:-116.537,michelin:0,reservation:true},
  {id:538,name:"Sailing 538",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.538,lng:-116.538,michelin:0,reservation:true},
  {id:539,name:"ATV Tours 539",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.539,lng:-116.539,michelin:0,reservation:true},
  {id:540,name:"Whale Watching 540",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.54,lng:-116.54,michelin:0,reservation:true},
  {id:541,name:"Scuba Diving 541",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.541,lng:-116.541,michelin:0,reservation:true},
  {id:542,name:"Snorkeling 542",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.542,lng:-116.542,michelin:0,reservation:true},
  {id:543,name:"Kayaking 543",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.543,lng:-116.543,michelin:0,reservation:true},
  {id:544,name:"Surfing 544",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.544,lng:-116.544,michelin:0,reservation:true},
  {id:545,name:"Paddleboarding 545",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.545,lng:-116.545,michelin:0,reservation:true},
  {id:546,name:"Kitesurfing 546",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.546,lng:-116.546,michelin:0,reservation:true},
  {id:547,name:"Fishing 547",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.547,lng:-116.547,michelin:0,reservation:true},
  {id:548,name:"Sailing 548",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.548000000000002,lng:-116.548,michelin:0,reservation:true},
  {id:549,name:"ATV Tours 549",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.549,lng:-116.549,michelin:0,reservation:true},
  {id:550,name:"Whale Watching 550",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.55,lng:-116.55,michelin:0,reservation:true},
  {id:551,name:"Scuba Diving 551",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.551,lng:-116.551,michelin:0,reservation:true},
  {id:552,name:"Snorkeling 552",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.552,lng:-116.552,michelin:0,reservation:true},
  {id:553,name:"Kayaking 553",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.553,lng:-116.553,michelin:0,reservation:true},
  {id:554,name:"Surfing 554",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.554,lng:-116.554,michelin:0,reservation:true},
  {id:555,name:"Paddleboarding 555",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.555,lng:-116.555,michelin:0,reservation:true},
  {id:556,name:"Kitesurfing 556",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.556,lng:-116.556,michelin:0,reservation:true},
  {id:557,name:"Fishing 557",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.557,lng:-116.557,michelin:0,reservation:true},
  {id:558,name:"Sailing 558",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.558,lng:-116.558,michelin:0,reservation:true},
  {id:559,name:"ATV Tours 559",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.559,lng:-116.559,michelin:0,reservation:true},
  {id:560,name:"Whale Watching 560",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.56,lng:-116.56,michelin:0,reservation:true},
  {id:561,name:"Scuba Diving 561",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.561,lng:-116.561,michelin:0,reservation:true},
  {id:562,name:"Snorkeling 562",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.562,lng:-116.562,michelin:0,reservation:true},
  {id:563,name:"Kayaking 563",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.563,lng:-116.563,michelin:0,reservation:true},
  {id:564,name:"Surfing 564",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.564,lng:-116.564,michelin:0,reservation:true},
  {id:565,name:"Paddleboarding 565",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.565,lng:-116.565,michelin:0,reservation:true},
  {id:566,name:"Kitesurfing 566",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.566,lng:-116.566,michelin:0,reservation:true},
  {id:567,name:"Fishing 567",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.567,lng:-116.567,michelin:0,reservation:true},
  {id:568,name:"Sailing 568",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.568,lng:-116.568,michelin:0,reservation:true},
  {id:569,name:"ATV Tours 569",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.569,lng:-116.569,michelin:0,reservation:true},
  {id:570,name:"Whale Watching 570",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.57,lng:-116.57,michelin:0,reservation:true},
  {id:571,name:"Scuba Diving 571",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.571,lng:-116.571,michelin:0,reservation:true},
  {id:572,name:"Snorkeling 572",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.572,lng:-116.572,michelin:0,reservation:true},
  {id:573,name:"Kayaking 573",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.573,lng:-116.573,michelin:0,reservation:true},
  {id:574,name:"Surfing 574",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.574,lng:-116.574,michelin:0,reservation:true},
  {id:575,name:"Paddleboarding 575",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.575,lng:-116.575,michelin:0,reservation:true},
  {id:576,name:"Kitesurfing 576",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.576,lng:-116.576,michelin:0,reservation:true},
  {id:577,name:"Fishing 577",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.576999999999998,lng:-116.577,michelin:0,reservation:true},
  {id:578,name:"Sailing 578",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.578,lng:-116.578,michelin:0,reservation:true},
  {id:579,name:"ATV Tours 579",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.579,lng:-116.579,michelin:0,reservation:true},
  {id:580,name:"Whale Watching 580",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.58,lng:-116.58,michelin:0,reservation:true},
  {id:581,name:"Scuba Diving 581",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.581,lng:-116.581,michelin:0,reservation:true},
  {id:582,name:"Snorkeling 582",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.582,lng:-116.582,michelin:0,reservation:true},
  {id:583,name:"Kayaking 583",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.583,lng:-116.583,michelin:0,reservation:true},
  {id:584,name:"Surfing 584",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.584,lng:-116.584,michelin:0,reservation:true},
  {id:585,name:"Paddleboarding 585",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.585,lng:-116.585,michelin:0,reservation:true},
  {id:586,name:"Kitesurfing 586",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.586,lng:-116.586,michelin:0,reservation:true},
  {id:587,name:"Fishing 587",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.587,lng:-116.587,michelin:0,reservation:true},
  {id:588,name:"Sailing 588",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.588,lng:-116.588,michelin:0,reservation:true},
  {id:589,name:"ATV Tours 589",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.589,lng:-116.589,michelin:0,reservation:true},
  {id:590,name:"Whale Watching 590",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.59,lng:-116.59,michelin:0,reservation:true},
  {id:591,name:"Scuba Diving 591",type:"adventure",category:"Scuba Diving",region:"Baja California",city:"Various",description:"Professional scuba diving tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.591,lng:-116.591,michelin:0,reservation:true},
  {id:592,name:"Snorkeling 592",type:"adventure",category:"Snorkeling",region:"Baja California",city:"Various",description:"Professional snorkeling tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.592,lng:-116.592,michelin:0,reservation:true},
  {id:593,name:"Kayaking 593",type:"adventure",category:"Kayaking",region:"Baja California",city:"Various",description:"Professional kayaking tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.593,lng:-116.593,michelin:0,reservation:true},
  {id:594,name:"Surfing 594",type:"adventure",category:"Surfing",region:"Baja California",city:"Various",description:"Professional surfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.594,lng:-116.594,michelin:0,reservation:true},
  {id:595,name:"Paddleboarding 595",type:"adventure",category:"Paddleboarding",region:"Baja California",city:"Various",description:"Professional paddleboarding tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.595,lng:-116.595,michelin:0,reservation:true},
  {id:596,name:"Kitesurfing 596",type:"adventure",category:"Kitesurfing",region:"Baja California",city:"Various",description:"Professional kitesurfing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.596,lng:-116.596,michelin:0,reservation:true},
  {id:597,name:"Fishing 597",type:"adventure",category:"Fishing",region:"Baja California",city:"Various",description:"Professional fishing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.597,lng:-116.597,michelin:0,reservation:true},
  {id:598,name:"Sailing 598",type:"adventure",category:"Sailing",region:"Baja California",city:"Various",description:"Professional sailing tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.598,lng:-116.598,michelin:0,reservation:true},
  {id:599,name:"ATV Tours 599",type:"adventure",category:"ATV Tours",region:"Baja California",city:"Various",description:"Professional atv tours tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.599,lng:-116.599,michelin:0,reservation:true},
  {id:600,name:"Whale Watching 600",type:"adventure",category:"Whale Watching",region:"Baja California",city:"Various",description:"Professional whale watching tours. Equipment included. Expert guides.",phone:"+52 646 340 2686",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",lat:31.6,lng:-116.6,michelin:0,reservation:true},
  {id:601,name:"Gallery 601",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.051,lng:-110.821,michelin:0,reservation:false},
  {id:602,name:"Gallery 602",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.052,lng:-110.822,michelin:0,reservation:false},
  {id:603,name:"Gallery 603",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.053,lng:-110.823,michelin:0,reservation:false},
  {id:604,name:"Gallery 604",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.054,lng:-110.824,michelin:0,reservation:false},
  {id:605,name:"Gallery 605",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.055,lng:-110.825,michelin:0,reservation:false},
  {id:606,name:"Gallery 606",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.056,lng:-110.826,michelin:0,reservation:false},
  {id:607,name:"Gallery 607",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.057,lng:-110.827,michelin:0,reservation:false},
  {id:608,name:"Gallery 608",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.058,lng:-110.828,michelin:0,reservation:false},
  {id:609,name:"Gallery 609",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.058999999999997,lng:-110.829,michelin:0,reservation:false},
  {id:610,name:"Gallery 610",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.06,lng:-110.83,michelin:0,reservation:false},
  {id:611,name:"Gallery 611",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.061,lng:-110.831,michelin:0,reservation:false},
  {id:612,name:"Gallery 612",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.061999999999998,lng:-110.832,michelin:0,reservation:false},
  {id:613,name:"Gallery 613",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.063,lng:-110.833,michelin:0,reservation:false},
  {id:614,name:"Gallery 614",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.064,lng:-110.834,michelin:0,reservation:false},
  {id:615,name:"Gallery 615",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.064999999999998,lng:-110.835,michelin:0,reservation:false},
  {id:616,name:"Gallery 616",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.066,lng:-110.836,michelin:0,reservation:false},
  {id:617,name:"Gallery 617",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.067,lng:-110.837,michelin:0,reservation:false},
  {id:618,name:"Gallery 618",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.067999999999998,lng:-110.838,michelin:0,reservation:false},
  {id:619,name:"Gallery 619",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.069,lng:-110.839,michelin:0,reservation:false},
  {id:620,name:"Gallery 620",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.07,lng:-110.84,michelin:0,reservation:false},
  {id:621,name:"Gallery 621",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.070999999999998,lng:-110.841,michelin:0,reservation:false},
  {id:622,name:"Gallery 622",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.072,lng:-110.842,michelin:0,reservation:false},
  {id:623,name:"Gallery 623",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.073,lng:-110.843,michelin:0,reservation:false},
  {id:624,name:"Gallery 624",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.073999999999998,lng:-110.844,michelin:0,reservation:false},
  {id:625,name:"Gallery 625",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.075,lng:-110.845,michelin:0,reservation:false},
  {id:626,name:"Gallery 626",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.076,lng:-110.846,michelin:0,reservation:false},
  {id:627,name:"Gallery 627",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.076999999999998,lng:-110.847,michelin:0,reservation:false},
  {id:628,name:"Gallery 628",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.078,lng:-110.848,michelin:0,reservation:false},
  {id:629,name:"Gallery 629",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.079,lng:-110.849,michelin:0,reservation:false},
  {id:630,name:"Gallery 630",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.08,lng:-110.85,michelin:0,reservation:false},
  {id:631,name:"Gallery 631",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.081,lng:-110.851,michelin:0,reservation:false},
  {id:632,name:"Gallery 632",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.082,lng:-110.852,michelin:0,reservation:false},
  {id:633,name:"Gallery 633",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.083,lng:-110.853,michelin:0,reservation:false},
  {id:634,name:"Gallery 634",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.084,lng:-110.854,michelin:0,reservation:false},
  {id:635,name:"Gallery 635",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.085,lng:-110.855,michelin:0,reservation:false},
  {id:636,name:"Gallery 636",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.086,lng:-110.856,michelin:0,reservation:false},
  {id:637,name:"Gallery 637",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.087,lng:-110.857,michelin:0,reservation:false},
  {id:638,name:"Gallery 638",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.088,lng:-110.858,michelin:0,reservation:false},
  {id:639,name:"Gallery 639",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.089,lng:-110.859,michelin:0,reservation:false},
  {id:640,name:"Gallery 640",type:"gallery",category:"Contemporary Art",region:"Todos Santos",city:"Todos Santos",description:"Contemporary Mexican art gallery. Local and international artists.",phone:"+52 612 145 0000",price:"$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",lat:24.09,lng:-110.86,michelin:0,reservation:false},
  {id:641,name:"Salon 641",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.691000000000003,lng:-110.331,michelin:0,reservation:true},
  {id:642,name:"Salon 642",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.692,lng:-110.332,michelin:0,reservation:true},
  {id:643,name:"Salon 643",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.693,lng:-110.333,michelin:0,reservation:true},
  {id:644,name:"Salon 644",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.694,lng:-110.334,michelin:0,reservation:true},
  {id:645,name:"Salon 645",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.695,lng:-110.335,michelin:0,reservation:true},
  {id:646,name:"Salon 646",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.696,lng:-110.336,michelin:0,reservation:true},
  {id:647,name:"Salon 647",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.697,lng:-110.337,michelin:0,reservation:true},
  {id:648,name:"Salon 648",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.698,lng:-110.338,michelin:0,reservation:true},
  {id:649,name:"Salon 649",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.699,lng:-110.339,michelin:0,reservation:true},
  {id:650,name:"Salon 650",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.7,lng:-110.34,michelin:0,reservation:true},
  {id:651,name:"Salon 651",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.701,lng:-110.341,michelin:0,reservation:true},
  {id:652,name:"Salon 652",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.702,lng:-110.342,michelin:0,reservation:true},
  {id:653,name:"Salon 653",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.703,lng:-110.343,michelin:0,reservation:true},
  {id:654,name:"Salon 654",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.704,lng:-110.344,michelin:0,reservation:true},
  {id:655,name:"Salon 655",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.705000000000002,lng:-110.345,michelin:0,reservation:true},
  {id:656,name:"Salon 656",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.706,lng:-110.346,michelin:0,reservation:true},
  {id:657,name:"Salon 657",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.707,lng:-110.347,michelin:0,reservation:true},
  {id:658,name:"Salon 658",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.708000000000002,lng:-110.348,michelin:0,reservation:true},
  {id:659,name:"Salon 659",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.709,lng:-110.349,michelin:0,reservation:true},
  {id:660,name:"Salon 660",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.71,lng:-110.35,michelin:0,reservation:true},
  {id:661,name:"Salon 661",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.711000000000002,lng:-110.351,michelin:0,reservation:true},
  {id:662,name:"Salon 662",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.712,lng:-110.352,michelin:0,reservation:true},
  {id:663,name:"Salon 663",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.713,lng:-110.353,michelin:0,reservation:true},
  {id:664,name:"Salon 664",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.714000000000002,lng:-110.354,michelin:0,reservation:true},
  {id:665,name:"Salon 665",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.715,lng:-110.355,michelin:0,reservation:true},
  {id:666,name:"Salon 666",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.716,lng:-110.356,michelin:0,reservation:true},
  {id:667,name:"Salon 667",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.717000000000002,lng:-110.357,michelin:0,reservation:true},
  {id:668,name:"Salon 668",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.718,lng:-110.358,michelin:0,reservation:true},
  {id:669,name:"Salon 669",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.719,lng:-110.359,michelin:0,reservation:true},
  {id:670,name:"Salon 670",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.720000000000002,lng:-110.36,michelin:0,reservation:true},
  {id:671,name:"Salon 671",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.721,lng:-110.361,michelin:0,reservation:true},
  {id:672,name:"Salon 672",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.722,lng:-110.362,michelin:0,reservation:true},
  {id:673,name:"Salon 673",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.723,lng:-110.363,michelin:0,reservation:true},
  {id:674,name:"Salon 674",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.724,lng:-110.364,michelin:0,reservation:true},
  {id:675,name:"Salon 675",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.725,lng:-110.365,michelin:0,reservation:true},
  {id:676,name:"Salon 676",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.726,lng:-110.366,michelin:0,reservation:true},
  {id:677,name:"Salon 677",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.727,lng:-110.367,michelin:0,reservation:true},
  {id:678,name:"Salon 678",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.728,lng:-110.368,michelin:0,reservation:true},
  {id:679,name:"Salon 679",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.729,lng:-110.369,michelin:0,reservation:true},
  {id:680,name:"Salon 680",type:"salon",category:"Luxury Salon",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end salon and spa. Hair, nails, skincare, and beauty treatments.",phone:"+52 624 142 0000",price:"$$",fee:150,website:"",photo:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",lat:23.73,lng:-110.37,michelin:0,reservation:true},
  {id:681,name:"Casino 681",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.201,lng:-117.711,michelin:0,reservation:false},
  {id:682,name:"Casino 682",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.202000000000005,lng:-117.712,michelin:0,reservation:false},
  {id:683,name:"Casino 683",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.203,lng:-117.71300000000001,michelin:0,reservation:false},
  {id:684,name:"Casino 684",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.204,lng:-117.714,michelin:0,reservation:false},
  {id:685,name:"Casino 685",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.205000000000005,lng:-117.715,michelin:0,reservation:false},
  {id:686,name:"Casino 686",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.206,lng:-117.71600000000001,michelin:0,reservation:false},
  {id:687,name:"Casino 687",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.207,lng:-117.717,michelin:0,reservation:false},
  {id:688,name:"Casino 688",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.208000000000006,lng:-117.718,michelin:0,reservation:false},
  {id:689,name:"Casino 689",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.209,lng:-117.719,michelin:0,reservation:false},
  {id:690,name:"Casino 690",type:"casino",category:"Gaming Resort",region:"Tijuana",city:"Tijuana",description:"Full-service casino. Slots, table games, poker room, sportsbook.",phone:"+52 664 682 3700",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",lat:33.21,lng:-117.72,michelin:0,reservation:false},
  {id:691,name:"Boutique 691",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.581,lng:-110.601,michelin:0,reservation:false},
  {id:692,name:"Boutique 692",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.582,lng:-110.60199999999999,michelin:0,reservation:false},
  {id:693,name:"Boutique 693",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.583000000000002,lng:-110.603,michelin:0,reservation:false},
  {id:694,name:"Boutique 694",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.584,lng:-110.604,michelin:0,reservation:false},
  {id:695,name:"Boutique 695",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.585,lng:-110.60499999999999,michelin:0,reservation:false},
  {id:696,name:"Boutique 696",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.586000000000002,lng:-110.606,michelin:0,reservation:false},
  {id:697,name:"Boutique 697",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.587,lng:-110.607,michelin:0,reservation:false},
  {id:698,name:"Boutique 698",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.588,lng:-110.60799999999999,michelin:0,reservation:false},
  {id:699,name:"Boutique 699",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.589000000000002,lng:-110.609,michelin:0,reservation:false},
  {id:700,name:"Boutique 700",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.59,lng:-110.61,michelin:0,reservation:false},
  {id:701,name:"Boutique 701",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.591,lng:-110.61099999999999,michelin:0,reservation:false},
  {id:702,name:"Boutique 702",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.592000000000002,lng:-110.612,michelin:0,reservation:false},
  {id:703,name:"Boutique 703",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.593,lng:-110.613,michelin:0,reservation:false},
  {id:704,name:"Boutique 704",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.594,lng:-110.61399999999999,michelin:0,reservation:false},
  {id:705,name:"Boutique 705",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.595,lng:-110.615,michelin:0,reservation:false},
  {id:706,name:"Boutique 706",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.596,lng:-110.616,michelin:0,reservation:false},
  {id:707,name:"Boutique 707",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.597,lng:-110.61699999999999,michelin:0,reservation:false},
  {id:708,name:"Boutique 708",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.598,lng:-110.618,michelin:0,reservation:false},
  {id:709,name:"Boutique 709",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.599,lng:-110.619,michelin:0,reservation:false},
  {id:710,name:"Boutique 710",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.6,lng:-110.61999999999999,michelin:0,reservation:false},
  {id:711,name:"Boutique 711",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.601,lng:-110.621,michelin:0,reservation:false},
  {id:712,name:"Boutique 712",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.602,lng:-110.622,michelin:0,reservation:false},
  {id:713,name:"Boutique 713",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.603,lng:-110.62299999999999,michelin:0,reservation:false},
  {id:714,name:"Boutique 714",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.604,lng:-110.624,michelin:0,reservation:false},
  {id:715,name:"Boutique 715",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.605,lng:-110.625,michelin:0,reservation:false},
  {id:716,name:"Boutique 716",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.606,lng:-110.62599999999999,michelin:0,reservation:false},
  {id:717,name:"Boutique 717",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.607,lng:-110.627,michelin:0,reservation:false},
  {id:718,name:"Boutique 718",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.608,lng:-110.628,michelin:0,reservation:false},
  {id:719,name:"Boutique 719",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.609,lng:-110.62899999999999,michelin:0,reservation:false},
  {id:720,name:"Boutique 720",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.61,lng:-110.63,michelin:0,reservation:false},
  {id:721,name:"Boutique 721",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.611,lng:-110.631,michelin:0,reservation:false},
  {id:722,name:"Boutique 722",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.612000000000002,lng:-110.63199999999999,michelin:0,reservation:false},
  {id:723,name:"Boutique 723",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.613,lng:-110.633,michelin:0,reservation:false},
  {id:724,name:"Boutique 724",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.614,lng:-110.634,michelin:0,reservation:false},
  {id:725,name:"Boutique 725",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.615000000000002,lng:-110.63499999999999,michelin:0,reservation:false},
  {id:726,name:"Boutique 726",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.616,lng:-110.636,michelin:0,reservation:false},
  {id:727,name:"Boutique 727",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.617,lng:-110.637,michelin:0,reservation:false},
  {id:728,name:"Boutique 728",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.618000000000002,lng:-110.63799999999999,michelin:0,reservation:false},
  {id:729,name:"Boutique 729",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.619,lng:-110.639,michelin:0,reservation:false},
  {id:730,name:"Boutique 730",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.62,lng:-110.64,michelin:0,reservation:false},
  {id:731,name:"Boutique 731",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.621000000000002,lng:-110.64099999999999,michelin:0,reservation:false},
  {id:732,name:"Boutique 732",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.622,lng:-110.642,michelin:0,reservation:false},
  {id:733,name:"Boutique 733",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.623,lng:-110.643,michelin:0,reservation:false},
  {id:734,name:"Boutique 734",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.624000000000002,lng:-110.64399999999999,michelin:0,reservation:false},
  {id:735,name:"Boutique 735",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.625,lng:-110.645,michelin:0,reservation:false},
  {id:736,name:"Boutique 736",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.626,lng:-110.646,michelin:0,reservation:false},
  {id:737,name:"Boutique 737",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.627,lng:-110.64699999999999,michelin:0,reservation:false},
  {id:738,name:"Boutique 738",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.628,lng:-110.648,michelin:0,reservation:false},
  {id:739,name:"Boutique 739",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.629,lng:-110.649,michelin:0,reservation:false},
  {id:740,name:"Boutique 740",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.63,lng:-110.64999999999999,michelin:0,reservation:false},
  {id:741,name:"Boutique 741",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.631,lng:-110.651,michelin:0,reservation:false},
  {id:742,name:"Boutique 742",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.632,lng:-110.652,michelin:0,reservation:false},
  {id:743,name:"Boutique 743",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.633,lng:-110.65299999999999,michelin:0,reservation:false},
  {id:744,name:"Boutique 744",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.634,lng:-110.654,michelin:0,reservation:false},
  {id:745,name:"Boutique 745",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.635,lng:-110.655,michelin:0,reservation:false},
  {id:746,name:"Boutique 746",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.636,lng:-110.65599999999999,michelin:0,reservation:false},
  {id:747,name:"Boutique 747",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.637,lng:-110.657,michelin:0,reservation:false},
  {id:748,name:"Boutique 748",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.638,lng:-110.658,michelin:0,reservation:false},
  {id:749,name:"Boutique 749",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.639,lng:-110.65899999999999,michelin:0,reservation:false},
  {id:750,name:"Boutique 750",type:"shopping",category:"Luxury Shopping",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury boutique. Designer brands, jewelry, art, and local crafts.",phone:"+52 624 143 0000",price:"$$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",lat:23.64,lng:-110.66,michelin:0,reservation:false},
  {id:751,name:"Billiards 751",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.271,lng:-117.781,michelin:0,reservation:false},
  {id:752,name:"Billiards 752",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.272000000000006,lng:-117.782,michelin:0,reservation:false},
  {id:753,name:"Billiards 753",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.273,lng:-117.783,michelin:0,reservation:false},
  {id:754,name:"Billiards 754",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.274,lng:-117.784,michelin:0,reservation:false},
  {id:755,name:"Billiards 755",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.275000000000006,lng:-117.785,michelin:0,reservation:false},
  {id:756,name:"Billiards 756",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.276,lng:-117.786,michelin:0,reservation:false},
  {id:757,name:"Billiards 757",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.277,lng:-117.787,michelin:0,reservation:false},
  {id:758,name:"Billiards 758",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.278000000000006,lng:-117.788,michelin:0,reservation:false},
  {id:759,name:"Billiards 759",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.279,lng:-117.789,michelin:0,reservation:false},
  {id:760,name:"Billiards 760",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.28,lng:-117.79,michelin:0,reservation:false},
  {id:761,name:"Billiards 761",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.281000000000006,lng:-117.791,michelin:0,reservation:false},
  {id:762,name:"Billiards 762",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.282000000000004,lng:-117.792,michelin:0,reservation:false},
  {id:763,name:"Billiards 763",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.283,lng:-117.793,michelin:0,reservation:false},
  {id:764,name:"Billiards 764",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.284000000000006,lng:-117.794,michelin:0,reservation:false},
  {id:765,name:"Billiards 765",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.285000000000004,lng:-117.795,michelin:0,reservation:false},
  {id:766,name:"Billiards 766",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.286,lng:-117.796,michelin:0,reservation:false},
  {id:767,name:"Billiards 767",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.287000000000006,lng:-117.797,michelin:0,reservation:false},
  {id:768,name:"Billiards 768",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.288000000000004,lng:-117.798,michelin:0,reservation:false},
  {id:769,name:"Billiards 769",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.289,lng:-117.799,michelin:0,reservation:false},
  {id:770,name:"Billiards 770",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.290000000000006,lng:-117.8,michelin:0,reservation:false},
  {id:771,name:"Billiards 771",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.291000000000004,lng:-117.801,michelin:0,reservation:false},
  {id:772,name:"Billiards 772",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.292,lng:-117.802,michelin:0,reservation:false},
  {id:773,name:"Billiards 773",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.293000000000006,lng:-117.803,michelin:0,reservation:false},
  {id:774,name:"Billiards 774",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.294000000000004,lng:-117.804,michelin:0,reservation:false},
  {id:775,name:"Billiards 775",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.295,lng:-117.805,michelin:0,reservation:false},
  {id:776,name:"Billiards 776",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.29600000000001,lng:-117.806,michelin:0,reservation:false},
  {id:777,name:"Billiards 777",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.297000000000004,lng:-117.807,michelin:0,reservation:false},
  {id:778,name:"Billiards 778",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.298,lng:-117.808,michelin:0,reservation:false},
  {id:779,name:"Billiards 779",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.29900000000001,lng:-117.809,michelin:0,reservation:false},
  {id:780,name:"Billiards 780",type:"pool-hall",category:"Upscale Billiards",region:"Tijuana",city:"Tijuana",description:"Upscale billiards lounge. Premium tables, full bar, food service.",phone:"+52 664 634 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",lat:33.300000000000004,lng:-117.81,michelin:0,reservation:false},
  {id:781,name:"Heli Tours 781",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.671,lng:-110.691,michelin:0,reservation:true},
  {id:782,name:"Heli Tours 782",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.672,lng:-110.692,michelin:0,reservation:true},
  {id:783,name:"Heli Tours 783",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.673000000000002,lng:-110.693,michelin:0,reservation:true},
  {id:784,name:"Heli Tours 784",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.674,lng:-110.694,michelin:0,reservation:true},
  {id:785,name:"Heli Tours 785",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.675,lng:-110.695,michelin:0,reservation:true},
  {id:786,name:"Heli Tours 786",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.676000000000002,lng:-110.696,michelin:0,reservation:true},
  {id:787,name:"Heli Tours 787",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.677,lng:-110.697,michelin:0,reservation:true},
  {id:788,name:"Heli Tours 788",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.678,lng:-110.698,michelin:0,reservation:true},
  {id:789,name:"Heli Tours 789",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.679000000000002,lng:-110.699,michelin:0,reservation:true},
  {id:790,name:"Heli Tours 790",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.68,lng:-110.7,michelin:0,reservation:true},
  {id:791,name:"Heli Tours 791",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.681,lng:-110.701,michelin:0,reservation:true},
  {id:792,name:"Heli Tours 792",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.682000000000002,lng:-110.702,michelin:0,reservation:true},
  {id:793,name:"Heli Tours 793",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.683,lng:-110.703,michelin:0,reservation:true},
  {id:794,name:"Heli Tours 794",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.684,lng:-110.704,michelin:0,reservation:true},
  {id:795,name:"Heli Tours 795",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.685000000000002,lng:-110.705,michelin:0,reservation:true},
  {id:796,name:"Heli Tours 796",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.686,lng:-110.706,michelin:0,reservation:true},
  {id:797,name:"Heli Tours 797",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.687,lng:-110.707,michelin:0,reservation:true},
  {id:798,name:"Heli Tours 798",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.688000000000002,lng:-110.708,michelin:0,reservation:true},
  {id:799,name:"Heli Tours 799",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.689,lng:-110.709,michelin:0,reservation:true},
  {id:800,name:"Heli Tours 800",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.69,lng:-110.71,michelin:0,reservation:true},
  {id:801,name:"Heli Tours 801",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.691,lng:-110.711,michelin:0,reservation:true},
  {id:802,name:"Heli Tours 802",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.692,lng:-110.712,michelin:0,reservation:true},
  {id:803,name:"Heli Tours 803",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.693,lng:-110.713,michelin:0,reservation:true},
  {id:804,name:"Heli Tours 804",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.694,lng:-110.714,michelin:0,reservation:true},
  {id:805,name:"Heli Tours 805",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.695,lng:-110.715,michelin:0,reservation:true},
  {id:806,name:"Heli Tours 806",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.696,lng:-110.716,michelin:0,reservation:true},
  {id:807,name:"Heli Tours 807",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.697,lng:-110.717,michelin:0,reservation:true},
  {id:808,name:"Heli Tours 808",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.698,lng:-110.718,michelin:0,reservation:true},
  {id:809,name:"Heli Tours 809",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.699,lng:-110.719,michelin:0,reservation:true},
  {id:810,name:"Heli Tours 810",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.7,lng:-110.72,michelin:0,reservation:true},
  {id:811,name:"Heli Tours 811",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.701,lng:-110.721,michelin:0,reservation:true},
  {id:812,name:"Heli Tours 812",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.702,lng:-110.722,michelin:0,reservation:true},
  {id:813,name:"Heli Tours 813",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.703,lng:-110.723,michelin:0,reservation:true},
  {id:814,name:"Heli Tours 814",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.704,lng:-110.72399999999999,michelin:0,reservation:true},
  {id:815,name:"Heli Tours 815",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.705000000000002,lng:-110.725,michelin:0,reservation:true},
  {id:816,name:"Heli Tours 816",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.706,lng:-110.726,michelin:0,reservation:true},
  {id:817,name:"Heli Tours 817",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.707,lng:-110.72699999999999,michelin:0,reservation:true},
  {id:818,name:"Heli Tours 818",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.708000000000002,lng:-110.728,michelin:0,reservation:true},
  {id:819,name:"Heli Tours 819",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.709,lng:-110.729,michelin:0,reservation:true},
  {id:820,name:"Heli Tours 820",type:"aviation",category:"Helicopter Tours",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Helicopter tours over Baja. Arch, beaches, and desert landscapes.",phone:"+52 624 143 5000",price:"$$$$",fee:500,website:"",photo:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",lat:23.71,lng:-110.72999999999999,michelin:0,reservation:true},
  {id:821,name:"Club 821",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.711000000000002,lng:-110.741,michelin:0,reservation:false},
  {id:822,name:"Club 822",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.712,lng:-110.742,michelin:0,reservation:false},
  {id:823,name:"Club 823",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.713,lng:-110.743,michelin:0,reservation:false},
  {id:824,name:"Club 824",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.714000000000002,lng:-110.744,michelin:0,reservation:false},
  {id:825,name:"Club 825",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.715,lng:-110.745,michelin:0,reservation:false},
  {id:826,name:"Club 826",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.716,lng:-110.746,michelin:0,reservation:false},
  {id:827,name:"Club 827",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.717000000000002,lng:-110.747,michelin:0,reservation:false},
  {id:828,name:"Club 828",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.718,lng:-110.748,michelin:0,reservation:false},
  {id:829,name:"Club 829",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.719,lng:-110.749,michelin:0,reservation:false},
  {id:830,name:"Club 830",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.72,lng:-110.75,michelin:0,reservation:false},
  {id:831,name:"Club 831",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.721,lng:-110.751,michelin:0,reservation:false},
  {id:832,name:"Club 832",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.722,lng:-110.752,michelin:0,reservation:false},
  {id:833,name:"Club 833",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.723,lng:-110.753,michelin:0,reservation:false},
  {id:834,name:"Club 834",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.724,lng:-110.754,michelin:0,reservation:false},
  {id:835,name:"Club 835",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.725,lng:-110.755,michelin:0,reservation:false},
  {id:836,name:"Club 836",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.726,lng:-110.756,michelin:0,reservation:false},
  {id:837,name:"Club 837",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.727,lng:-110.757,michelin:0,reservation:false},
  {id:838,name:"Club 838",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.728,lng:-110.758,michelin:0,reservation:false},
  {id:839,name:"Club 839",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.729,lng:-110.759,michelin:0,reservation:false},
  {id:840,name:"Club 840",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.73,lng:-110.76,michelin:0,reservation:false},
  {id:841,name:"Club 841",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.731,lng:-110.761,michelin:0,reservation:false},
  {id:842,name:"Club 842",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.732,lng:-110.762,michelin:0,reservation:false},
  {id:843,name:"Club 843",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.733,lng:-110.763,michelin:0,reservation:false},
  {id:844,name:"Club 844",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.734,lng:-110.764,michelin:0,reservation:false},
  {id:845,name:"Club 845",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.735,lng:-110.765,michelin:0,reservation:false},
  {id:846,name:"Club 846",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.736,lng:-110.766,michelin:0,reservation:false},
  {id:847,name:"Club 847",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.737000000000002,lng:-110.767,michelin:0,reservation:false},
  {id:848,name:"Club 848",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.738,lng:-110.768,michelin:0,reservation:false},
  {id:849,name:"Club 849",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.739,lng:-110.769,michelin:0,reservation:false},
  {id:850,name:"Club 850",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.740000000000002,lng:-110.77,michelin:0,reservation:false},
  {id:851,name:"Club 851",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.741,lng:-110.771,michelin:0,reservation:false},
  {id:852,name:"Club 852",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.742,lng:-110.772,michelin:0,reservation:false},
  {id:853,name:"Club 853",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.743000000000002,lng:-110.773,michelin:0,reservation:false},
  {id:854,name:"Club 854",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.744,lng:-110.774,michelin:0,reservation:false},
  {id:855,name:"Club 855",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.745,lng:-110.775,michelin:0,reservation:false},
  {id:856,name:"Club 856",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.746000000000002,lng:-110.776,michelin:0,reservation:false},
  {id:857,name:"Club 857",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.747,lng:-110.777,michelin:0,reservation:false},
  {id:858,name:"Club 858",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.748,lng:-110.778,michelin:0,reservation:false},
  {id:859,name:"Club 859",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.749000000000002,lng:-110.779,michelin:0,reservation:false},
  {id:860,name:"Club 860",type:"nightclub",category:"Dance Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier nightclub. International DJs, VIP tables, full bar.",phone:"+52 624 143 0000",price:"$$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",lat:23.75,lng:-110.78,michelin:0,reservation:false},
  {id:861,name:"Rooftop 861",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.751,lng:-110.771,michelin:0,reservation:false},
  {id:862,name:"Rooftop 862",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.752,lng:-110.77199999999999,michelin:0,reservation:false},
  {id:863,name:"Rooftop 863",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.753,lng:-110.773,michelin:0,reservation:false},
  {id:864,name:"Rooftop 864",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.754,lng:-110.774,michelin:0,reservation:false},
  {id:865,name:"Rooftop 865",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.755,lng:-110.77499999999999,michelin:0,reservation:false},
  {id:866,name:"Rooftop 866",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.756,lng:-110.776,michelin:0,reservation:false},
  {id:867,name:"Rooftop 867",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.757,lng:-110.777,michelin:0,reservation:false},
  {id:868,name:"Rooftop 868",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.758,lng:-110.77799999999999,michelin:0,reservation:false},
  {id:869,name:"Rooftop 869",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.759,lng:-110.779,michelin:0,reservation:false},
  {id:870,name:"Rooftop 870",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.76,lng:-110.78,michelin:0,reservation:false},
  {id:871,name:"Rooftop 871",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.761,lng:-110.78099999999999,michelin:0,reservation:false},
  {id:872,name:"Rooftop 872",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.762,lng:-110.782,michelin:0,reservation:false},
  {id:873,name:"Rooftop 873",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.763,lng:-110.783,michelin:0,reservation:false},
  {id:874,name:"Rooftop 874",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.764,lng:-110.78399999999999,michelin:0,reservation:false},
  {id:875,name:"Rooftop 875",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.765,lng:-110.785,michelin:0,reservation:false},
  {id:876,name:"Rooftop 876",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.766000000000002,lng:-110.786,michelin:0,reservation:false},
  {id:877,name:"Rooftop 877",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.767,lng:-110.78699999999999,michelin:0,reservation:false},
  {id:878,name:"Rooftop 878",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.768,lng:-110.788,michelin:0,reservation:false},
  {id:879,name:"Rooftop 879",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.769000000000002,lng:-110.789,michelin:0,reservation:false},
  {id:880,name:"Rooftop 880",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.77,lng:-110.78999999999999,michelin:0,reservation:false},
  {id:881,name:"Rooftop 881",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.771,lng:-110.791,michelin:0,reservation:false},
  {id:882,name:"Rooftop 882",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.772000000000002,lng:-110.792,michelin:0,reservation:false},
  {id:883,name:"Rooftop 883",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.773,lng:-110.79299999999999,michelin:0,reservation:false},
  {id:884,name:"Rooftop 884",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.774,lng:-110.794,michelin:0,reservation:false},
  {id:885,name:"Rooftop 885",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.775000000000002,lng:-110.795,michelin:0,reservation:false},
  {id:886,name:"Rooftop 886",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.776,lng:-110.79599999999999,michelin:0,reservation:false},
  {id:887,name:"Rooftop 887",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.777,lng:-110.797,michelin:0,reservation:false},
  {id:888,name:"Rooftop 888",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.778000000000002,lng:-110.798,michelin:0,reservation:false},
  {id:889,name:"Rooftop 889",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.779,lng:-110.79899999999999,michelin:0,reservation:false},
  {id:890,name:"Rooftop 890",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.78,lng:-110.8,michelin:0,reservation:false},
  {id:891,name:"Rooftop 891",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.781,lng:-110.801,michelin:0,reservation:false},
  {id:892,name:"Rooftop 892",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.782,lng:-110.80199999999999,michelin:0,reservation:false},
  {id:893,name:"Rooftop 893",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.783,lng:-110.803,michelin:0,reservation:false},
  {id:894,name:"Rooftop 894",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.784,lng:-110.804,michelin:0,reservation:false},
  {id:895,name:"Rooftop 895",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.785,lng:-110.80499999999999,michelin:0,reservation:false},
  {id:896,name:"Rooftop 896",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.786,lng:-110.806,michelin:0,reservation:false},
  {id:897,name:"Rooftop 897",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.787,lng:-110.807,michelin:0,reservation:false},
  {id:898,name:"Rooftop 898",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.788,lng:-110.80799999999999,michelin:0,reservation:false},
  {id:899,name:"Rooftop 899",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.789,lng:-110.809,michelin:0,reservation:false},
  {id:900,name:"Rooftop 900",type:"rooftop",category:"Rooftop Bar",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Rooftop bar with panoramic ocean views. Craft cocktails and small plates.",phone:"+52 624 163 0000",price:"$$",fee:0,website:"",photo:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",lat:23.79,lng:-110.81,michelin:0,reservation:false},
  {id:901,name:"Restaurant 901",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.901,lng:-116.901,michelin:0,reservation:false},
  {id:902,name:"Restaurant 902",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.902,lng:-116.902,michelin:0,reservation:false},
  {id:903,name:"Restaurant 903",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.903,lng:-116.903,michelin:0,reservation:false},
  {id:904,name:"Restaurant 904",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.904,lng:-116.904,michelin:0,reservation:false},
  {id:905,name:"Restaurant 905",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.905,lng:-116.905,michelin:0,reservation:false},
  {id:906,name:"Restaurant 906",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.906,lng:-116.906,michelin:0,reservation:false},
  {id:907,name:"Restaurant 907",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.907,lng:-116.907,michelin:0,reservation:false},
  {id:908,name:"Restaurant 908",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.908,lng:-116.908,michelin:0,reservation:false},
  {id:909,name:"Restaurant 909",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.909,lng:-116.909,michelin:0,reservation:false},
  {id:910,name:"Restaurant 910",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.91,lng:-116.91,michelin:0,reservation:false},
  {id:911,name:"Restaurant 911",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.911,lng:-116.911,michelin:0,reservation:false},
  {id:912,name:"Restaurant 912",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.912,lng:-116.912,michelin:0,reservation:false},
  {id:913,name:"Restaurant 913",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.913,lng:-116.913,michelin:0,reservation:false},
  {id:914,name:"Restaurant 914",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.914,lng:-116.914,michelin:0,reservation:false},
  {id:915,name:"Restaurant 915",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.915,lng:-116.915,michelin:0,reservation:false},
  {id:916,name:"Restaurant 916",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.916,lng:-116.916,michelin:0,reservation:false},
  {id:917,name:"Restaurant 917",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.917,lng:-116.917,michelin:0,reservation:false},
  {id:918,name:"Restaurant 918",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.918,lng:-116.918,michelin:0,reservation:false},
  {id:919,name:"Restaurant 919",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.919,lng:-116.919,michelin:0,reservation:false},
  {id:920,name:"Restaurant 920",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.92,lng:-116.92,michelin:0,reservation:false},
  {id:921,name:"Restaurant 921",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.921,lng:-116.921,michelin:0,reservation:false},
  {id:922,name:"Restaurant 922",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.922,lng:-116.922,michelin:0,reservation:false},
  {id:923,name:"Restaurant 923",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.923000000000002,lng:-116.923,michelin:0,reservation:false},
  {id:924,name:"Restaurant 924",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.924,lng:-116.924,michelin:0,reservation:false},
  {id:925,name:"Restaurant 925",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.925,lng:-116.925,michelin:0,reservation:false},
  {id:926,name:"Restaurant 926",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.926,lng:-116.926,michelin:0,reservation:false},
  {id:927,name:"Restaurant 927",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.927,lng:-116.927,michelin:0,reservation:false},
  {id:928,name:"Restaurant 928",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.928,lng:-116.928,michelin:0,reservation:false},
  {id:929,name:"Restaurant 929",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.929,lng:-116.929,michelin:0,reservation:false},
  {id:930,name:"Restaurant 930",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.93,lng:-116.93,michelin:0,reservation:false},
  {id:931,name:"Restaurant 931",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.931,lng:-116.931,michelin:0,reservation:false},
  {id:932,name:"Restaurant 932",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.932,lng:-116.932,michelin:0,reservation:false},
  {id:933,name:"Restaurant 933",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.933,lng:-116.933,michelin:0,reservation:false},
  {id:934,name:"Restaurant 934",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.934,lng:-116.934,michelin:0,reservation:false},
  {id:935,name:"Restaurant 935",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.935,lng:-116.935,michelin:0,reservation:false},
  {id:936,name:"Restaurant 936",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.936,lng:-116.936,michelin:0,reservation:false},
  {id:937,name:"Restaurant 937",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.937,lng:-116.937,michelin:0,reservation:false},
  {id:938,name:"Restaurant 938",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.938,lng:-116.938,michelin:0,reservation:false},
  {id:939,name:"Restaurant 939",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.939,lng:-116.939,michelin:0,reservation:false},
  {id:940,name:"Restaurant 940",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.94,lng:-116.94,michelin:0,reservation:false},
  {id:941,name:"Restaurant 941",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.941,lng:-116.941,michelin:0,reservation:false},
  {id:942,name:"Restaurant 942",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.942,lng:-116.942,michelin:0,reservation:false},
  {id:943,name:"Restaurant 943",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.943,lng:-116.943,michelin:0,reservation:false},
  {id:944,name:"Restaurant 944",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.944,lng:-116.944,michelin:0,reservation:false},
  {id:945,name:"Restaurant 945",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.945,lng:-116.945,michelin:0,reservation:false},
  {id:946,name:"Restaurant 946",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.946,lng:-116.946,michelin:0,reservation:false},
  {id:947,name:"Restaurant 947",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.947,lng:-116.947,michelin:0,reservation:false},
  {id:948,name:"Restaurant 948",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.948,lng:-116.948,michelin:0,reservation:false},
  {id:949,name:"Restaurant 949",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.949,lng:-116.949,michelin:0,reservation:false},
  {id:950,name:"Restaurant 950",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.95,lng:-116.95,michelin:0,reservation:false},
  {id:951,name:"Restaurant 951",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.951,lng:-116.951,michelin:0,reservation:false},
  {id:952,name:"Restaurant 952",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.952,lng:-116.952,michelin:0,reservation:false},
  {id:953,name:"Restaurant 953",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.953,lng:-116.953,michelin:0,reservation:false},
  {id:954,name:"Restaurant 954",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.954,lng:-116.954,michelin:0,reservation:false},
  {id:955,name:"Restaurant 955",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.955,lng:-116.955,michelin:0,reservation:false},
  {id:956,name:"Restaurant 956",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.956,lng:-116.956,michelin:0,reservation:false},
  {id:957,name:"Restaurant 957",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.957,lng:-116.957,michelin:0,reservation:false},
  {id:958,name:"Restaurant 958",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.958,lng:-116.958,michelin:0,reservation:false},
  {id:959,name:"Restaurant 959",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.959,lng:-116.959,michelin:0,reservation:false},
  {id:960,name:"Restaurant 960",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.96,lng:-116.96,michelin:0,reservation:false},
  {id:961,name:"Restaurant 961",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.961,lng:-116.961,michelin:0,reservation:false},
  {id:962,name:"Restaurant 962",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.962,lng:-116.962,michelin:0,reservation:false},
  {id:963,name:"Restaurant 963",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.963,lng:-116.963,michelin:0,reservation:false},
  {id:964,name:"Restaurant 964",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.964,lng:-116.964,michelin:0,reservation:false},
  {id:965,name:"Restaurant 965",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.965,lng:-116.965,michelin:0,reservation:false},
  {id:966,name:"Restaurant 966",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.966,lng:-116.966,michelin:0,reservation:false},
  {id:967,name:"Restaurant 967",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.967,lng:-116.967,michelin:0,reservation:false},
  {id:968,name:"Restaurant 968",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.968,lng:-116.968,michelin:0,reservation:false},
  {id:969,name:"Restaurant 969",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.969,lng:-116.969,michelin:0,reservation:false},
  {id:970,name:"Restaurant 970",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.97,lng:-116.97,michelin:0,reservation:false},
  {id:971,name:"Restaurant 971",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.971,lng:-116.971,michelin:0,reservation:false},
  {id:972,name:"Restaurant 972",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.972,lng:-116.972,michelin:0,reservation:false},
  {id:973,name:"Restaurant 973",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.973,lng:-116.973,michelin:0,reservation:false},
  {id:974,name:"Restaurant 974",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.974,lng:-116.974,michelin:0,reservation:false},
  {id:975,name:"Restaurant 975",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.975,lng:-116.975,michelin:0,reservation:false},
  {id:976,name:"Restaurant 976",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.976,lng:-116.976,michelin:0,reservation:false},
  {id:977,name:"Restaurant 977",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.977,lng:-116.977,michelin:0,reservation:false},
  {id:978,name:"Restaurant 978",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.978,lng:-116.978,michelin:0,reservation:false},
  {id:979,name:"Restaurant 979",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.979,lng:-116.979,michelin:0,reservation:false},
  {id:980,name:"Restaurant 980",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.98,lng:-116.98,michelin:0,reservation:false},
  {id:981,name:"Restaurant 981",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.981,lng:-116.981,michelin:0,reservation:false},
  {id:982,name:"Restaurant 982",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.982,lng:-116.982,michelin:0,reservation:false},
  {id:983,name:"Restaurant 983",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.983,lng:-116.983,michelin:0,reservation:false},
  {id:984,name:"Restaurant 984",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.984,lng:-116.984,michelin:0,reservation:false},
  {id:985,name:"Restaurant 985",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.985,lng:-116.985,michelin:0,reservation:false},
  {id:986,name:"Restaurant 986",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.986,lng:-116.986,michelin:0,reservation:false},
  {id:987,name:"Restaurant 987",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.987,lng:-116.987,michelin:0,reservation:false},
  {id:988,name:"Restaurant 988",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.988,lng:-116.988,michelin:0,reservation:false},
  {id:989,name:"Restaurant 989",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.989,lng:-116.989,michelin:0,reservation:false},
  {id:990,name:"Restaurant 990",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.99,lng:-116.99,michelin:0,reservation:false},
  {id:991,name:"Restaurant 991",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.991,lng:-116.991,michelin:0,reservation:false},
  {id:992,name:"Restaurant 992",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.992,lng:-116.992,michelin:0,reservation:false},
  {id:993,name:"Restaurant 993",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.993,lng:-116.993,michelin:0,reservation:false},
  {id:994,name:"Restaurant 994",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.994,lng:-116.994,michelin:0,reservation:false},
  {id:995,name:"Restaurant 995",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.995,lng:-116.995,michelin:0,reservation:false},
  {id:996,name:"Restaurant 996",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.996,lng:-116.996,michelin:0,reservation:false},
  {id:997,name:"Restaurant 997",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.997,lng:-116.997,michelin:0,reservation:false},
  {id:998,name:"Restaurant 998",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.998,lng:-116.998,michelin:0,reservation:false},
  {id:999,name:"Restaurant 999",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:31.999,lng:-116.999,michelin:0,reservation:false},
  {id:1000,name:"Restaurant 1000",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.0,lng:-117.0,michelin:0,reservation:false},
  {id:1001,name:"Restaurant 1001",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.001,lng:-117.001,michelin:0,reservation:false},
  {id:1002,name:"Restaurant 1002",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.002,lng:-117.002,michelin:0,reservation:false},
  {id:1003,name:"Restaurant 1003",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.003,lng:-117.003,michelin:0,reservation:false},
  {id:1004,name:"Restaurant 1004",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.004,lng:-117.004,michelin:0,reservation:false},
  {id:1005,name:"Restaurant 1005",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.005,lng:-117.005,michelin:0,reservation:false},
  {id:1006,name:"Restaurant 1006",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.006,lng:-117.006,michelin:0,reservation:false},
  {id:1007,name:"Restaurant 1007",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.007,lng:-117.007,michelin:0,reservation:false},
  {id:1008,name:"Restaurant 1008",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.008,lng:-117.008,michelin:0,reservation:false},
  {id:1009,name:"Restaurant 1009",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.009,lng:-117.009,michelin:0,reservation:false},
  {id:1010,name:"Restaurant 1010",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.01,lng:-117.01,michelin:0,reservation:false},
  {id:1011,name:"Restaurant 1011",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.011,lng:-117.011,michelin:0,reservation:false},
  {id:1012,name:"Restaurant 1012",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.012,lng:-117.012,michelin:0,reservation:false},
  {id:1013,name:"Restaurant 1013",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.013,lng:-117.013,michelin:0,reservation:false},
  {id:1014,name:"Restaurant 1014",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.014,lng:-117.014,michelin:0,reservation:false},
  {id:1015,name:"Restaurant 1015",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.015,lng:-117.015,michelin:0,reservation:false},
  {id:1016,name:"Restaurant 1016",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.016,lng:-117.016,michelin:0,reservation:false},
  {id:1017,name:"Restaurant 1017",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.017,lng:-117.017,michelin:0,reservation:false},
  {id:1018,name:"Restaurant 1018",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.018,lng:-117.018,michelin:0,reservation:false},
  {id:1019,name:"Restaurant 1019",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.019,lng:-117.019,michelin:0,reservation:false},
  {id:1020,name:"Restaurant 1020",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.02,lng:-117.02,michelin:0,reservation:false},
  {id:1021,name:"Restaurant 1021",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.021,lng:-117.021,michelin:0,reservation:false},
  {id:1022,name:"Restaurant 1022",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.022,lng:-117.022,michelin:0,reservation:false},
  {id:1023,name:"Restaurant 1023",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.023,lng:-117.023,michelin:0,reservation:false},
  {id:1024,name:"Restaurant 1024",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.024,lng:-117.024,michelin:0,reservation:false},
  {id:1025,name:"Restaurant 1025",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.025,lng:-117.025,michelin:0,reservation:false},
  {id:1026,name:"Restaurant 1026",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.026,lng:-117.026,michelin:0,reservation:false},
  {id:1027,name:"Restaurant 1027",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.027,lng:-117.027,michelin:0,reservation:false},
  {id:1028,name:"Restaurant 1028",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.028,lng:-117.028,michelin:0,reservation:false},
  {id:1029,name:"Restaurant 1029",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.028999999999996,lng:-117.029,michelin:0,reservation:false},
  {id:1030,name:"Restaurant 1030",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.03,lng:-117.03,michelin:0,reservation:false},
  {id:1031,name:"Restaurant 1031",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.031,lng:-117.031,michelin:0,reservation:false},
  {id:1032,name:"Restaurant 1032",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.032,lng:-117.032,michelin:0,reservation:false},
  {id:1033,name:"Restaurant 1033",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.033,lng:-117.033,michelin:0,reservation:false},
  {id:1034,name:"Restaurant 1034",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.034,lng:-117.034,michelin:0,reservation:false},
  {id:1035,name:"Restaurant 1035",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.035,lng:-117.035,michelin:0,reservation:false},
  {id:1036,name:"Restaurant 1036",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.036,lng:-117.036,michelin:0,reservation:false},
  {id:1037,name:"Restaurant 1037",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.037,lng:-117.037,michelin:0,reservation:false},
  {id:1038,name:"Restaurant 1038",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.038,lng:-117.038,michelin:0,reservation:false},
  {id:1039,name:"Restaurant 1039",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.039,lng:-117.039,michelin:0,reservation:false},
  {id:1040,name:"Restaurant 1040",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.04,lng:-117.04,michelin:0,reservation:false},
  {id:1041,name:"Restaurant 1041",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.041,lng:-117.041,michelin:0,reservation:false},
  {id:1042,name:"Restaurant 1042",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.042,lng:-117.042,michelin:0,reservation:false},
  {id:1043,name:"Restaurant 1043",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.043,lng:-117.043,michelin:0,reservation:false},
  {id:1044,name:"Restaurant 1044",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.044,lng:-117.044,michelin:0,reservation:false},
  {id:1045,name:"Restaurant 1045",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.045,lng:-117.045,michelin:0,reservation:false},
  {id:1046,name:"Restaurant 1046",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.046,lng:-117.046,michelin:0,reservation:false},
  {id:1047,name:"Restaurant 1047",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.047,lng:-117.047,michelin:0,reservation:false},
  {id:1048,name:"Restaurant 1048",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.048,lng:-117.048,michelin:0,reservation:false},
  {id:1049,name:"Restaurant 1049",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.049,lng:-117.049,michelin:0,reservation:false},
  {id:1050,name:"Restaurant 1050",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.05,lng:-117.05,michelin:0,reservation:false},
  {id:1051,name:"Restaurant 1051",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.051,lng:-117.051,michelin:0,reservation:false},
  {id:1052,name:"Restaurant 1052",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.052,lng:-117.052,michelin:0,reservation:false},
  {id:1053,name:"Restaurant 1053",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.053,lng:-117.053,michelin:0,reservation:false},
  {id:1054,name:"Restaurant 1054",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.054,lng:-117.054,michelin:0,reservation:false},
  {id:1055,name:"Restaurant 1055",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.055,lng:-117.055,michelin:0,reservation:false},
  {id:1056,name:"Restaurant 1056",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.056,lng:-117.056,michelin:0,reservation:false},
  {id:1057,name:"Restaurant 1057",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.057,lng:-117.057,michelin:0,reservation:false},
  {id:1058,name:"Restaurant 1058",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.058,lng:-117.058,michelin:0,reservation:false},
  {id:1059,name:"Restaurant 1059",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.059,lng:-117.059,michelin:0,reservation:false},
  {id:1060,name:"Restaurant 1060",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.06,lng:-117.06,michelin:0,reservation:false},
  {id:1061,name:"Restaurant 1061",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.061,lng:-117.061,michelin:0,reservation:false},
  {id:1062,name:"Restaurant 1062",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.062,lng:-117.062,michelin:0,reservation:false},
  {id:1063,name:"Restaurant 1063",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.063,lng:-117.063,michelin:0,reservation:false},
  {id:1064,name:"Restaurant 1064",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.064,lng:-117.064,michelin:0,reservation:false},
  {id:1065,name:"Restaurant 1065",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.065,lng:-117.065,michelin:0,reservation:false},
  {id:1066,name:"Restaurant 1066",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.066,lng:-117.066,michelin:0,reservation:false},
  {id:1067,name:"Restaurant 1067",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.067,lng:-117.067,michelin:0,reservation:false},
  {id:1068,name:"Restaurant 1068",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.068,lng:-117.068,michelin:0,reservation:false},
  {id:1069,name:"Restaurant 1069",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.069,lng:-117.069,michelin:0,reservation:false},
  {id:1070,name:"Restaurant 1070",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.07,lng:-117.07,michelin:0,reservation:false},
  {id:1071,name:"Restaurant 1071",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.071,lng:-117.071,michelin:0,reservation:false},
  {id:1072,name:"Restaurant 1072",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.072,lng:-117.072,michelin:0,reservation:false},
  {id:1073,name:"Restaurant 1073",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.073,lng:-117.073,michelin:0,reservation:false},
  {id:1074,name:"Restaurant 1074",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.074,lng:-117.074,michelin:0,reservation:false},
  {id:1075,name:"Restaurant 1075",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.075,lng:-117.075,michelin:0,reservation:false},
  {id:1076,name:"Restaurant 1076",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.076,lng:-117.076,michelin:0,reservation:false},
  {id:1077,name:"Restaurant 1077",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.077,lng:-117.077,michelin:0,reservation:false},
  {id:1078,name:"Restaurant 1078",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.078,lng:-117.078,michelin:0,reservation:false},
  {id:1079,name:"Restaurant 1079",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.079,lng:-117.079,michelin:0,reservation:false},
  {id:1080,name:"Restaurant 1080",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.08,lng:-117.08,michelin:0,reservation:false},
  {id:1081,name:"Restaurant 1081",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.081,lng:-117.081,michelin:0,reservation:false},
  {id:1082,name:"Restaurant 1082",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.082,lng:-117.082,michelin:0,reservation:false},
  {id:1083,name:"Restaurant 1083",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.083,lng:-117.083,michelin:0,reservation:false},
  {id:1084,name:"Restaurant 1084",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.084,lng:-117.084,michelin:0,reservation:false},
  {id:1085,name:"Restaurant 1085",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.085,lng:-117.085,michelin:0,reservation:false},
  {id:1086,name:"Restaurant 1086",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.086,lng:-117.086,michelin:0,reservation:false},
  {id:1087,name:"Restaurant 1087",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.087,lng:-117.087,michelin:0,reservation:false},
  {id:1088,name:"Restaurant 1088",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.088,lng:-117.088,michelin:0,reservation:false},
  {id:1089,name:"Restaurant 1089",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.089,lng:-117.089,michelin:0,reservation:false},
  {id:1090,name:"Restaurant 1090",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.09,lng:-117.09,michelin:0,reservation:false},
  {id:1091,name:"Restaurant 1091",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.091,lng:-117.091,michelin:0,reservation:false},
  {id:1092,name:"Restaurant 1092",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.092,lng:-117.092,michelin:0,reservation:false},
  {id:1093,name:"Restaurant 1093",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.093,lng:-117.093,michelin:0,reservation:false},
  {id:1094,name:"Restaurant 1094",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.094,lng:-117.094,michelin:0,reservation:false},
  {id:1095,name:"Restaurant 1095",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.095,lng:-117.095,michelin:0,reservation:false},
  {id:1096,name:"Restaurant 1096",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.096000000000004,lng:-117.096,michelin:0,reservation:false},
  {id:1097,name:"Restaurant 1097",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.097,lng:-117.097,michelin:0,reservation:false},
  {id:1098,name:"Restaurant 1098",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.098,lng:-117.098,michelin:0,reservation:false},
  {id:1099,name:"Restaurant 1099",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.099,lng:-117.099,michelin:0,reservation:false},
  {id:1100,name:"Restaurant 1100",type:"restaurant",category:"Casual Dining",region:"Baja California",city:"Various",description:"Excellent casual dining. Fresh seafood, traditional Mexican cuisine.",phone:"+52 646 178 0000",price:"$$",fee:50,website:"",photo:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",lat:32.1,lng:-117.1,michelin:0,reservation:false},
  {id:1101,name:"Hotel 1101",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.101,lng:-117.101,michelin:0,reservation:true},
  {id:1102,name:"Hotel 1102",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.102,lng:-117.102,michelin:0,reservation:true},
  {id:1103,name:"Hotel 1103",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.103,lng:-117.103,michelin:0,reservation:true},
  {id:1104,name:"Hotel 1104",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.104,lng:-117.104,michelin:0,reservation:true},
  {id:1105,name:"Hotel 1105",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.105,lng:-117.105,michelin:0,reservation:true},
  {id:1106,name:"Hotel 1106",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.106,lng:-117.106,michelin:0,reservation:true},
  {id:1107,name:"Hotel 1107",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.107,lng:-117.107,michelin:0,reservation:true},
  {id:1108,name:"Hotel 1108",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.108,lng:-117.108,michelin:0,reservation:true},
  {id:1109,name:"Hotel 1109",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.109,lng:-117.109,michelin:0,reservation:true},
  {id:1110,name:"Hotel 1110",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.11,lng:-117.11,michelin:0,reservation:true},
  {id:1111,name:"Hotel 1111",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.111,lng:-117.111,michelin:0,reservation:true},
  {id:1112,name:"Hotel 1112",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.112,lng:-117.112,michelin:0,reservation:true},
  {id:1113,name:"Hotel 1113",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.113,lng:-117.113,michelin:0,reservation:true},
  {id:1114,name:"Hotel 1114",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.114,lng:-117.114,michelin:0,reservation:true},
  {id:1115,name:"Hotel 1115",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.115,lng:-117.115,michelin:0,reservation:true},
  {id:1116,name:"Hotel 1116",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.116,lng:-117.116,michelin:0,reservation:true},
  {id:1117,name:"Hotel 1117",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.117,lng:-117.117,michelin:0,reservation:true},
  {id:1118,name:"Hotel 1118",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.118,lng:-117.118,michelin:0,reservation:true},
  {id:1119,name:"Hotel 1119",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.119,lng:-117.119,michelin:0,reservation:true},
  {id:1120,name:"Hotel 1120",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.12,lng:-117.12,michelin:0,reservation:true},
  {id:1121,name:"Hotel 1121",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.121,lng:-117.121,michelin:0,reservation:true},
  {id:1122,name:"Hotel 1122",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.122,lng:-117.122,michelin:0,reservation:true},
  {id:1123,name:"Hotel 1123",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.123,lng:-117.123,michelin:0,reservation:true},
  {id:1124,name:"Hotel 1124",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.124,lng:-117.124,michelin:0,reservation:true},
  {id:1125,name:"Hotel 1125",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.125,lng:-117.125,michelin:0,reservation:true},
  {id:1126,name:"Hotel 1126",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.126,lng:-117.126,michelin:0,reservation:true},
  {id:1127,name:"Hotel 1127",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.127,lng:-117.127,michelin:0,reservation:true},
  {id:1128,name:"Hotel 1128",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.128,lng:-117.128,michelin:0,reservation:true},
  {id:1129,name:"Hotel 1129",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.129,lng:-117.129,michelin:0,reservation:true},
  {id:1130,name:"Hotel 1130",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.13,lng:-117.13,michelin:0,reservation:true},
  {id:1131,name:"Hotel 1131",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.131,lng:-117.131,michelin:0,reservation:true},
  {id:1132,name:"Hotel 1132",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.132,lng:-117.132,michelin:0,reservation:true},
  {id:1133,name:"Hotel 1133",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.133,lng:-117.133,michelin:0,reservation:true},
  {id:1134,name:"Hotel 1134",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.134,lng:-117.134,michelin:0,reservation:true},
  {id:1135,name:"Hotel 1135",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.135,lng:-117.135,michelin:0,reservation:true},
  {id:1136,name:"Hotel 1136",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.136,lng:-117.136,michelin:0,reservation:true},
  {id:1137,name:"Hotel 1137",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.137,lng:-117.137,michelin:0,reservation:true},
  {id:1138,name:"Hotel 1138",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.138,lng:-117.138,michelin:0,reservation:true},
  {id:1139,name:"Hotel 1139",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.139,lng:-117.139,michelin:0,reservation:true},
  {id:1140,name:"Hotel 1140",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.14,lng:-117.14,michelin:0,reservation:true},
  {id:1141,name:"Hotel 1141",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.141,lng:-117.141,michelin:0,reservation:true},
  {id:1142,name:"Hotel 1142",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.142,lng:-117.142,michelin:0,reservation:true},
  {id:1143,name:"Hotel 1143",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.143,lng:-117.143,michelin:0,reservation:true},
  {id:1144,name:"Hotel 1144",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.144,lng:-117.144,michelin:0,reservation:true},
  {id:1145,name:"Hotel 1145",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.145,lng:-117.145,michelin:0,reservation:true},
  {id:1146,name:"Hotel 1146",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.146,lng:-117.146,michelin:0,reservation:true},
  {id:1147,name:"Hotel 1147",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.147,lng:-117.147,michelin:0,reservation:true},
  {id:1148,name:"Hotel 1148",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.148,lng:-117.148,michelin:0,reservation:true},
  {id:1149,name:"Hotel 1149",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.149,lng:-117.149,michelin:0,reservation:true},
  {id:1150,name:"Hotel 1150",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.15,lng:-117.15,michelin:0,reservation:true},
  {id:1151,name:"Hotel 1151",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.151,lng:-117.151,michelin:0,reservation:true},
  {id:1152,name:"Hotel 1152",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.152,lng:-117.152,michelin:0,reservation:true},
  {id:1153,name:"Hotel 1153",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.153,lng:-117.153,michelin:0,reservation:true},
  {id:1154,name:"Hotel 1154",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.153999999999996,lng:-117.154,michelin:0,reservation:true},
  {id:1155,name:"Hotel 1155",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.155,lng:-117.155,michelin:0,reservation:true},
  {id:1156,name:"Hotel 1156",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.156,lng:-117.156,michelin:0,reservation:true},
  {id:1157,name:"Hotel 1157",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.157,lng:-117.157,michelin:0,reservation:true},
  {id:1158,name:"Hotel 1158",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.158,lng:-117.158,michelin:0,reservation:true},
  {id:1159,name:"Hotel 1159",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.159,lng:-117.159,michelin:0,reservation:true},
  {id:1160,name:"Hotel 1160",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.16,lng:-117.16,michelin:0,reservation:true},
  {id:1161,name:"Hotel 1161",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.161,lng:-117.161,michelin:0,reservation:true},
  {id:1162,name:"Hotel 1162",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.162,lng:-117.162,michelin:0,reservation:true},
  {id:1163,name:"Hotel 1163",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.163,lng:-117.163,michelin:0,reservation:true},
  {id:1164,name:"Hotel 1164",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.164,lng:-117.164,michelin:0,reservation:true},
  {id:1165,name:"Hotel 1165",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.165,lng:-117.165,michelin:0,reservation:true},
  {id:1166,name:"Hotel 1166",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.166,lng:-117.166,michelin:0,reservation:true},
  {id:1167,name:"Hotel 1167",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.167,lng:-117.167,michelin:0,reservation:true},
  {id:1168,name:"Hotel 1168",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.168,lng:-117.168,michelin:0,reservation:true},
  {id:1169,name:"Hotel 1169",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.169,lng:-117.169,michelin:0,reservation:true},
  {id:1170,name:"Hotel 1170",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.17,lng:-117.17,michelin:0,reservation:true},
  {id:1171,name:"Hotel 1171",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.171,lng:-117.171,michelin:0,reservation:true},
  {id:1172,name:"Hotel 1172",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.172,lng:-117.172,michelin:0,reservation:true},
  {id:1173,name:"Hotel 1173",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.173,lng:-117.173,michelin:0,reservation:true},
  {id:1174,name:"Hotel 1174",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.174,lng:-117.174,michelin:0,reservation:true},
  {id:1175,name:"Hotel 1175",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.175,lng:-117.175,michelin:0,reservation:true},
  {id:1176,name:"Hotel 1176",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.176,lng:-117.176,michelin:0,reservation:true},
  {id:1177,name:"Hotel 1177",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.177,lng:-117.177,michelin:0,reservation:true},
  {id:1178,name:"Hotel 1178",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.178,lng:-117.178,michelin:0,reservation:true},
  {id:1179,name:"Hotel 1179",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.179,lng:-117.179,michelin:0,reservation:true},
  {id:1180,name:"Hotel 1180",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.18,lng:-117.18,michelin:0,reservation:true},
  {id:1181,name:"Hotel 1181",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.181,lng:-117.181,michelin:0,reservation:true},
  {id:1182,name:"Hotel 1182",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.182,lng:-117.182,michelin:0,reservation:true},
  {id:1183,name:"Hotel 1183",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.183,lng:-117.183,michelin:0,reservation:true},
  {id:1184,name:"Hotel 1184",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.184,lng:-117.184,michelin:0,reservation:true},
  {id:1185,name:"Hotel 1185",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.185,lng:-117.185,michelin:0,reservation:true},
  {id:1186,name:"Hotel 1186",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.186,lng:-117.186,michelin:0,reservation:true},
  {id:1187,name:"Hotel 1187",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.187,lng:-117.187,michelin:0,reservation:true},
  {id:1188,name:"Hotel 1188",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.188,lng:-117.188,michelin:0,reservation:true},
  {id:1189,name:"Hotel 1189",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.189,lng:-117.189,michelin:0,reservation:true},
  {id:1190,name:"Hotel 1190",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.19,lng:-117.19,michelin:0,reservation:true},
  {id:1191,name:"Hotel 1191",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.191,lng:-117.191,michelin:0,reservation:true},
  {id:1192,name:"Hotel 1192",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.192,lng:-117.192,michelin:0,reservation:true},
  {id:1193,name:"Hotel 1193",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.193,lng:-117.193,michelin:0,reservation:true},
  {id:1194,name:"Hotel 1194",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.194,lng:-117.194,michelin:0,reservation:true},
  {id:1195,name:"Hotel 1195",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.195,lng:-117.195,michelin:0,reservation:true},
  {id:1196,name:"Hotel 1196",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.196,lng:-117.196,michelin:0,reservation:true},
  {id:1197,name:"Hotel 1197",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.197,lng:-117.197,michelin:0,reservation:true},
  {id:1198,name:"Hotel 1198",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.198,lng:-117.198,michelin:0,reservation:true},
  {id:1199,name:"Hotel 1199",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.199,lng:-117.199,michelin:0,reservation:true},
  {id:1200,name:"Hotel 1200",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.2,lng:-117.2,michelin:0,reservation:true},
  {id:1201,name:"Hotel 1201",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.201,lng:-117.201,michelin:0,reservation:true},
  {id:1202,name:"Hotel 1202",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.202,lng:-117.202,michelin:0,reservation:true},
  {id:1203,name:"Hotel 1203",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.203,lng:-117.203,michelin:0,reservation:true},
  {id:1204,name:"Hotel 1204",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.204,lng:-117.204,michelin:0,reservation:true},
  {id:1205,name:"Hotel 1205",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.205,lng:-117.205,michelin:0,reservation:true},
  {id:1206,name:"Hotel 1206",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.206,lng:-117.206,michelin:0,reservation:true},
  {id:1207,name:"Hotel 1207",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.207,lng:-117.207,michelin:0,reservation:true},
  {id:1208,name:"Hotel 1208",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.208,lng:-117.208,michelin:0,reservation:true},
  {id:1209,name:"Hotel 1209",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.209,lng:-117.209,michelin:0,reservation:true},
  {id:1210,name:"Hotel 1210",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.21,lng:-117.21,michelin:0,reservation:true},
  {id:1211,name:"Hotel 1211",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.211,lng:-117.211,michelin:0,reservation:true},
  {id:1212,name:"Hotel 1212",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.212,lng:-117.212,michelin:0,reservation:true},
  {id:1213,name:"Hotel 1213",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.213,lng:-117.213,michelin:0,reservation:true},
  {id:1214,name:"Hotel 1214",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.214,lng:-117.214,michelin:0,reservation:true},
  {id:1215,name:"Hotel 1215",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.215,lng:-117.215,michelin:0,reservation:true},
  {id:1216,name:"Hotel 1216",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.216,lng:-117.216,michelin:0,reservation:true},
  {id:1217,name:"Hotel 1217",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.217,lng:-117.217,michelin:0,reservation:true},
  {id:1218,name:"Hotel 1218",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.218,lng:-117.218,michelin:0,reservation:true},
  {id:1219,name:"Hotel 1219",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.219,lng:-117.219,michelin:0,reservation:true},
  {id:1220,name:"Hotel 1220",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.22,lng:-117.22,michelin:0,reservation:true},
  {id:1221,name:"Hotel 1221",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.221000000000004,lng:-117.221,michelin:0,reservation:true},
  {id:1222,name:"Hotel 1222",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.222,lng:-117.222,michelin:0,reservation:true},
  {id:1223,name:"Hotel 1223",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.223,lng:-117.223,michelin:0,reservation:true},
  {id:1224,name:"Hotel 1224",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.224,lng:-117.224,michelin:0,reservation:true},
  {id:1225,name:"Hotel 1225",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.225,lng:-117.225,michelin:0,reservation:true},
  {id:1226,name:"Hotel 1226",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.226,lng:-117.226,michelin:0,reservation:true},
  {id:1227,name:"Hotel 1227",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.227,lng:-117.227,michelin:0,reservation:true},
  {id:1228,name:"Hotel 1228",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.228,lng:-117.228,michelin:0,reservation:true},
  {id:1229,name:"Hotel 1229",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.229,lng:-117.229,michelin:0,reservation:true},
  {id:1230,name:"Hotel 1230",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.23,lng:-117.23,michelin:0,reservation:true},
  {id:1231,name:"Hotel 1231",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.231,lng:-117.231,michelin:0,reservation:true},
  {id:1232,name:"Hotel 1232",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.232,lng:-117.232,michelin:0,reservation:true},
  {id:1233,name:"Hotel 1233",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.233,lng:-117.233,michelin:0,reservation:true},
  {id:1234,name:"Hotel 1234",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.234,lng:-117.234,michelin:0,reservation:true},
  {id:1235,name:"Hotel 1235",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.235,lng:-117.235,michelin:0,reservation:true},
  {id:1236,name:"Hotel 1236",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.236,lng:-117.236,michelin:0,reservation:true},
  {id:1237,name:"Hotel 1237",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.237,lng:-117.237,michelin:0,reservation:true},
  {id:1238,name:"Hotel 1238",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.238,lng:-117.238,michelin:0,reservation:true},
  {id:1239,name:"Hotel 1239",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.239,lng:-117.239,michelin:0,reservation:true},
  {id:1240,name:"Hotel 1240",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.24,lng:-117.24,michelin:0,reservation:true},
  {id:1241,name:"Hotel 1241",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.241,lng:-117.241,michelin:0,reservation:true},
  {id:1242,name:"Hotel 1242",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.242,lng:-117.242,michelin:0,reservation:true},
  {id:1243,name:"Hotel 1243",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.243,lng:-117.243,michelin:0,reservation:true},
  {id:1244,name:"Hotel 1244",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.244,lng:-117.244,michelin:0,reservation:true},
  {id:1245,name:"Hotel 1245",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.245,lng:-117.245,michelin:0,reservation:true},
  {id:1246,name:"Hotel 1246",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.246,lng:-117.246,michelin:0,reservation:true},
  {id:1247,name:"Hotel 1247",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.247,lng:-117.247,michelin:0,reservation:true},
  {id:1248,name:"Hotel 1248",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.248,lng:-117.248,michelin:0,reservation:true},
  {id:1249,name:"Hotel 1249",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.249,lng:-117.249,michelin:0,reservation:true},
  {id:1250,name:"Hotel 1250",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.25,lng:-117.25,michelin:0,reservation:true},
  {id:1251,name:"Hotel 1251",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.251,lng:-117.251,michelin:0,reservation:true},
  {id:1252,name:"Hotel 1252",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.252,lng:-117.252,michelin:0,reservation:true},
  {id:1253,name:"Hotel 1253",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.253,lng:-117.253,michelin:0,reservation:true},
  {id:1254,name:"Hotel 1254",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.254,lng:-117.254,michelin:0,reservation:true},
  {id:1255,name:"Hotel 1255",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.255,lng:-117.255,michelin:0,reservation:true},
  {id:1256,name:"Hotel 1256",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.256,lng:-117.256,michelin:0,reservation:true},
  {id:1257,name:"Hotel 1257",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.257,lng:-117.257,michelin:0,reservation:true},
  {id:1258,name:"Hotel 1258",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.258,lng:-117.258,michelin:0,reservation:true},
  {id:1259,name:"Hotel 1259",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.259,lng:-117.259,michelin:0,reservation:true},
  {id:1260,name:"Hotel 1260",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.26,lng:-117.26,michelin:0,reservation:true},
  {id:1261,name:"Hotel 1261",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.261,lng:-117.261,michelin:0,reservation:true},
  {id:1262,name:"Hotel 1262",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.262,lng:-117.262,michelin:0,reservation:true},
  {id:1263,name:"Hotel 1263",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.263,lng:-117.263,michelin:0,reservation:true},
  {id:1264,name:"Hotel 1264",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.264,lng:-117.264,michelin:0,reservation:true},
  {id:1265,name:"Hotel 1265",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.265,lng:-117.265,michelin:0,reservation:true},
  {id:1266,name:"Hotel 1266",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.266,lng:-117.266,michelin:0,reservation:true},
  {id:1267,name:"Hotel 1267",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.267,lng:-117.267,michelin:0,reservation:true},
  {id:1268,name:"Hotel 1268",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.268,lng:-117.268,michelin:0,reservation:true},
  {id:1269,name:"Hotel 1269",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.269,lng:-117.269,michelin:0,reservation:true},
  {id:1270,name:"Hotel 1270",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.27,lng:-117.27,michelin:0,reservation:true},
  {id:1271,name:"Hotel 1271",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.271,lng:-117.271,michelin:0,reservation:true},
  {id:1272,name:"Hotel 1272",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.272,lng:-117.272,michelin:0,reservation:true},
  {id:1273,name:"Hotel 1273",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.273,lng:-117.273,michelin:0,reservation:true},
  {id:1274,name:"Hotel 1274",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.274,lng:-117.274,michelin:0,reservation:true},
  {id:1275,name:"Hotel 1275",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.275,lng:-117.275,michelin:0,reservation:true},
  {id:1276,name:"Hotel 1276",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.276,lng:-117.276,michelin:0,reservation:true},
  {id:1277,name:"Hotel 1277",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.277,lng:-117.277,michelin:0,reservation:true},
  {id:1278,name:"Hotel 1278",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.278,lng:-117.278,michelin:0,reservation:true},
  {id:1279,name:"Hotel 1279",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.279,lng:-117.279,michelin:0,reservation:true},
  {id:1280,name:"Hotel 1280",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.28,lng:-117.28,michelin:0,reservation:true},
  {id:1281,name:"Hotel 1281",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.281,lng:-117.281,michelin:0,reservation:true},
  {id:1282,name:"Hotel 1282",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.282,lng:-117.282,michelin:0,reservation:true},
  {id:1283,name:"Hotel 1283",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.283,lng:-117.283,michelin:0,reservation:true},
  {id:1284,name:"Hotel 1284",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.284,lng:-117.284,michelin:0,reservation:true},
  {id:1285,name:"Hotel 1285",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.285,lng:-117.285,michelin:0,reservation:true},
  {id:1286,name:"Hotel 1286",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.286,lng:-117.286,michelin:0,reservation:true},
  {id:1287,name:"Hotel 1287",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.287,lng:-117.287,michelin:0,reservation:true},
  {id:1288,name:"Hotel 1288",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.288,lng:-117.288,michelin:0,reservation:true},
  {id:1289,name:"Hotel 1289",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.289,lng:-117.289,michelin:0,reservation:true},
  {id:1290,name:"Hotel 1290",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.29,lng:-117.29,michelin:0,reservation:true},
  {id:1291,name:"Hotel 1291",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.291,lng:-117.291,michelin:0,reservation:true},
  {id:1292,name:"Hotel 1292",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.292,lng:-117.292,michelin:0,reservation:true},
  {id:1293,name:"Hotel 1293",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.293,lng:-117.293,michelin:0,reservation:true},
  {id:1294,name:"Hotel 1294",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.294,lng:-117.294,michelin:0,reservation:true},
  {id:1295,name:"Hotel 1295",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.295,lng:-117.295,michelin:0,reservation:true},
  {id:1296,name:"Hotel 1296",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.296,lng:-117.296,michelin:0,reservation:true},
  {id:1297,name:"Hotel 1297",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.297,lng:-117.297,michelin:0,reservation:true},
  {id:1298,name:"Hotel 1298",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.298,lng:-117.298,michelin:0,reservation:true},
  {id:1299,name:"Hotel 1299",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.299,lng:-117.299,michelin:0,reservation:true},
  {id:1300,name:"Hotel 1300",type:"hotel",category:"Boutique Hotel",region:"Baja California",city:"Various",description:"Charming boutique hotel. Local character and personalized service.",phone:"+52 646 155 0000",price:"$$",fee:200,website:"",photo:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",lat:32.3,lng:-117.3,michelin:0,reservation:true},
  {id:1301,name:"Vinicola 1301",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.501999999999995,lng:-119.202,michelin:0,reservation:false},
  {id:1302,name:"Vinicola 1302",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.504,lng:-119.204,michelin:0,reservation:false},
  {id:1303,name:"Vinicola 1303",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.506,lng:-119.20599999999999,michelin:0,reservation:false},
  {id:1304,name:"Vinicola 1304",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.507999999999996,lng:-119.208,michelin:0,reservation:false},
  {id:1305,name:"Vinicola 1305",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.51,lng:-119.21,michelin:0,reservation:false},
  {id:1306,name:"Vinicola 1306",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.512,lng:-119.21199999999999,michelin:0,reservation:false},
  {id:1307,name:"Vinicola 1307",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.513999999999996,lng:-119.214,michelin:0,reservation:false},
  {id:1308,name:"Vinicola 1308",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.516,lng:-119.216,michelin:0,reservation:false},
  {id:1309,name:"Vinicola 1309",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.518,lng:-119.21799999999999,michelin:0,reservation:false},
  {id:1310,name:"Vinicola 1310",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.519999999999996,lng:-119.22,michelin:0,reservation:false},
  {id:1311,name:"Vinicola 1311",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.522,lng:-119.222,michelin:0,reservation:false},
  {id:1312,name:"Vinicola 1312",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.524,lng:-119.22399999999999,michelin:0,reservation:false},
  {id:1313,name:"Vinicola 1313",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.525999999999996,lng:-119.226,michelin:0,reservation:false},
  {id:1314,name:"Vinicola 1314",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.528,lng:-119.228,michelin:0,reservation:false},
  {id:1315,name:"Vinicola 1315",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.53,lng:-119.22999999999999,michelin:0,reservation:false},
  {id:1316,name:"Vinicola 1316",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.532,lng:-119.232,michelin:0,reservation:false},
  {id:1317,name:"Vinicola 1317",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.534,lng:-119.234,michelin:0,reservation:false},
  {id:1318,name:"Vinicola 1318",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.536,lng:-119.23599999999999,michelin:0,reservation:false},
  {id:1319,name:"Vinicola 1319",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.538,lng:-119.238,michelin:0,reservation:false},
  {id:1320,name:"Vinicola 1320",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.54,lng:-119.24,michelin:0,reservation:false},
  {id:1321,name:"Vinicola 1321",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.542,lng:-119.24199999999999,michelin:0,reservation:false},
  {id:1322,name:"Vinicola 1322",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.544,lng:-119.244,michelin:0,reservation:false},
  {id:1323,name:"Vinicola 1323",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.546,lng:-119.246,michelin:0,reservation:false},
  {id:1324,name:"Vinicola 1324",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.548,lng:-119.24799999999999,michelin:0,reservation:false},
  {id:1325,name:"Vinicola 1325",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.55,lng:-119.25,michelin:0,reservation:false},
  {id:1326,name:"Vinicola 1326",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.552,lng:-119.252,michelin:0,reservation:false},
  {id:1327,name:"Vinicola 1327",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.554,lng:-119.25399999999999,michelin:0,reservation:false},
  {id:1328,name:"Vinicola 1328",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.556,lng:-119.256,michelin:0,reservation:false},
  {id:1329,name:"Vinicola 1329",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.558,lng:-119.258,michelin:0,reservation:false},
  {id:1330,name:"Vinicola 1330",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.56,lng:-119.25999999999999,michelin:0,reservation:false},
  {id:1331,name:"Vinicola 1331",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.562,lng:-119.262,michelin:0,reservation:false},
  {id:1332,name:"Vinicola 1332",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.564,lng:-119.264,michelin:0,reservation:false},
  {id:1333,name:"Vinicola 1333",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.565999999999995,lng:-119.26599999999999,michelin:0,reservation:false},
  {id:1334,name:"Vinicola 1334",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.568,lng:-119.268,michelin:0,reservation:false},
  {id:1335,name:"Vinicola 1335",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.57,lng:-119.27,michelin:0,reservation:false},
  {id:1336,name:"Vinicola 1336",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.571999999999996,lng:-119.27199999999999,michelin:0,reservation:false},
  {id:1337,name:"Vinicola 1337",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.574,lng:-119.274,michelin:0,reservation:false},
  {id:1338,name:"Vinicola 1338",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.576,lng:-119.276,michelin:0,reservation:false},
  {id:1339,name:"Vinicola 1339",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.577999999999996,lng:-119.27799999999999,michelin:0,reservation:false},
  {id:1340,name:"Vinicola 1340",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.58,lng:-119.28,michelin:0,reservation:false},
  {id:1341,name:"Vinicola 1341",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.582,lng:-119.282,michelin:0,reservation:false},
  {id:1342,name:"Vinicola 1342",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.583999999999996,lng:-119.28399999999999,michelin:0,reservation:false},
  {id:1343,name:"Vinicola 1343",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.586,lng:-119.286,michelin:0,reservation:false},
  {id:1344,name:"Vinicola 1344",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.588,lng:-119.288,michelin:0,reservation:false},
  {id:1345,name:"Vinicola 1345",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.589999999999996,lng:-119.28999999999999,michelin:0,reservation:false},
  {id:1346,name:"Vinicola 1346",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.592,lng:-119.292,michelin:0,reservation:false},
  {id:1347,name:"Vinicola 1347",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.594,lng:-119.294,michelin:0,reservation:false},
  {id:1348,name:"Vinicola 1348",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.596,lng:-119.29599999999999,michelin:0,reservation:false},
  {id:1349,name:"Vinicola 1349",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.598,lng:-119.29799999999999,michelin:0,reservation:false},
  {id:1350,name:"Vinicola 1350",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.6,lng:-119.3,michelin:0,reservation:false},
  {id:1351,name:"Vinicola 1351",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.602,lng:-119.30199999999999,michelin:0,reservation:false},
  {id:1352,name:"Vinicola 1352",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.604,lng:-119.30399999999999,michelin:0,reservation:false},
  {id:1353,name:"Vinicola 1353",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.606,lng:-119.306,michelin:0,reservation:false},
  {id:1354,name:"Vinicola 1354",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.608,lng:-119.30799999999999,michelin:0,reservation:false},
  {id:1355,name:"Vinicola 1355",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.61,lng:-119.30999999999999,michelin:0,reservation:false},
  {id:1356,name:"Vinicola 1356",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.612,lng:-119.312,michelin:0,reservation:false},
  {id:1357,name:"Vinicola 1357",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.614,lng:-119.314,michelin:0,reservation:false},
  {id:1358,name:"Vinicola 1358",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.616,lng:-119.31599999999999,michelin:0,reservation:false},
  {id:1359,name:"Vinicola 1359",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.617999999999995,lng:-119.318,michelin:0,reservation:false},
  {id:1360,name:"Vinicola 1360",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.62,lng:-119.32,michelin:0,reservation:false},
  {id:1361,name:"Vinicola 1361",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.622,lng:-119.32199999999999,michelin:0,reservation:false},
  {id:1362,name:"Vinicola 1362",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.623999999999995,lng:-119.324,michelin:0,reservation:false},
  {id:1363,name:"Vinicola 1363",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.626,lng:-119.326,michelin:0,reservation:false},
  {id:1364,name:"Vinicola 1364",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.628,lng:-119.32799999999999,michelin:0,reservation:false},
  {id:1365,name:"Vinicola 1365",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.629999999999995,lng:-119.33,michelin:0,reservation:false},
  {id:1366,name:"Vinicola 1366",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.632,lng:-119.332,michelin:0,reservation:false},
  {id:1367,name:"Vinicola 1367",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.634,lng:-119.33399999999999,michelin:0,reservation:false},
  {id:1368,name:"Vinicola 1368",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.635999999999996,lng:-119.336,michelin:0,reservation:false},
  {id:1369,name:"Vinicola 1369",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.638,lng:-119.338,michelin:0,reservation:false},
  {id:1370,name:"Vinicola 1370",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.64,lng:-119.33999999999999,michelin:0,reservation:false},
  {id:1371,name:"Vinicola 1371",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.641999999999996,lng:-119.342,michelin:0,reservation:false},
  {id:1372,name:"Vinicola 1372",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.644,lng:-119.344,michelin:0,reservation:false},
  {id:1373,name:"Vinicola 1373",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.646,lng:-119.34599999999999,michelin:0,reservation:false},
  {id:1374,name:"Vinicola 1374",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.647999999999996,lng:-119.348,michelin:0,reservation:false},
  {id:1375,name:"Vinicola 1375",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.65,lng:-119.35,michelin:0,reservation:false},
  {id:1376,name:"Vinicola 1376",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.652,lng:-119.35199999999999,michelin:0,reservation:false},
  {id:1377,name:"Vinicola 1377",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.653999999999996,lng:-119.354,michelin:0,reservation:false},
  {id:1378,name:"Vinicola 1378",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.656,lng:-119.356,michelin:0,reservation:false},
  {id:1379,name:"Vinicola 1379",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.658,lng:-119.35799999999999,michelin:0,reservation:false},
  {id:1380,name:"Vinicola 1380",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.66,lng:-119.36,michelin:0,reservation:false},
  {id:1381,name:"Vinicola 1381",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.662,lng:-119.362,michelin:0,reservation:false},
  {id:1382,name:"Vinicola 1382",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.664,lng:-119.36399999999999,michelin:0,reservation:false},
  {id:1383,name:"Vinicola 1383",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.666,lng:-119.366,michelin:0,reservation:false},
  {id:1384,name:"Vinicola 1384",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.668,lng:-119.368,michelin:0,reservation:false},
  {id:1385,name:"Vinicola 1385",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.67,lng:-119.36999999999999,michelin:0,reservation:false},
  {id:1386,name:"Vinicola 1386",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.672,lng:-119.372,michelin:0,reservation:false},
  {id:1387,name:"Vinicola 1387",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.674,lng:-119.374,michelin:0,reservation:false},
  {id:1388,name:"Vinicola 1388",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.676,lng:-119.37599999999999,michelin:0,reservation:false},
  {id:1389,name:"Vinicola 1389",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.678,lng:-119.378,michelin:0,reservation:false},
  {id:1390,name:"Vinicola 1390",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.68,lng:-119.38,michelin:0,reservation:false},
  {id:1391,name:"Vinicola 1391",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.682,lng:-119.38199999999999,michelin:0,reservation:false},
  {id:1392,name:"Vinicola 1392",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.684,lng:-119.384,michelin:0,reservation:false},
  {id:1393,name:"Vinicola 1393",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.686,lng:-119.386,michelin:0,reservation:false},
  {id:1394,name:"Vinicola 1394",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.688,lng:-119.38799999999999,michelin:0,reservation:false},
  {id:1395,name:"Vinicola 1395",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.69,lng:-119.39,michelin:0,reservation:false},
  {id:1396,name:"Vinicola 1396",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.692,lng:-119.392,michelin:0,reservation:false},
  {id:1397,name:"Vinicola 1397",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.693999999999996,lng:-119.39399999999999,michelin:0,reservation:false},
  {id:1398,name:"Vinicola 1398",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.696,lng:-119.396,michelin:0,reservation:false},
  {id:1399,name:"Vinicola 1399",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.698,lng:-119.398,michelin:0,reservation:false},
  {id:1400,name:"Vinicola 1400",type:"winery",category:"Family Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-owned winery. Traditional methods and quality wines.",phone:"+52 646 156 0000",price:"$",fee:20,website:"",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",lat:34.699999999999996,lng:-119.39999999999999,michelin:0,reservation:false},
  {id:1401,name:"Estate 1401",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.401,lng:-117.401,michelin:0,reservation:true},
  {id:1402,name:"Estate 1402",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.402,lng:-117.402,michelin:0,reservation:true},
  {id:1403,name:"Estate 1403",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.403,lng:-117.403,michelin:0,reservation:true},
  {id:1404,name:"Estate 1404",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.404,lng:-117.404,michelin:0,reservation:true},
  {id:1405,name:"Estate 1405",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.405,lng:-117.405,michelin:0,reservation:true},
  {id:1406,name:"Estate 1406",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.406,lng:-117.406,michelin:0,reservation:true},
  {id:1407,name:"Estate 1407",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.407,lng:-117.407,michelin:0,reservation:true},
  {id:1408,name:"Estate 1408",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.408,lng:-117.408,michelin:0,reservation:true},
  {id:1409,name:"Estate 1409",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.409,lng:-117.409,michelin:0,reservation:true},
  {id:1410,name:"Estate 1410",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.41,lng:-117.41,michelin:0,reservation:true},
  {id:1411,name:"Estate 1411",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.411,lng:-117.411,michelin:0,reservation:true},
  {id:1412,name:"Estate 1412",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.412,lng:-117.412,michelin:0,reservation:true},
  {id:1413,name:"Estate 1413",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.413,lng:-117.413,michelin:0,reservation:true},
  {id:1414,name:"Estate 1414",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.414,lng:-117.414,michelin:0,reservation:true},
  {id:1415,name:"Estate 1415",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.415,lng:-117.415,michelin:0,reservation:true},
  {id:1416,name:"Estate 1416",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.416,lng:-117.416,michelin:0,reservation:true},
  {id:1417,name:"Estate 1417",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.417,lng:-117.417,michelin:0,reservation:true},
  {id:1418,name:"Estate 1418",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.418,lng:-117.418,michelin:0,reservation:true},
  {id:1419,name:"Estate 1419",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.419,lng:-117.419,michelin:0,reservation:true},
  {id:1420,name:"Estate 1420",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.42,lng:-117.42,michelin:0,reservation:true},
  {id:1421,name:"Estate 1421",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.421,lng:-117.421,michelin:0,reservation:true},
  {id:1422,name:"Estate 1422",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.422,lng:-117.422,michelin:0,reservation:true},
  {id:1423,name:"Estate 1423",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.423,lng:-117.423,michelin:0,reservation:true},
  {id:1424,name:"Estate 1424",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.424,lng:-117.424,michelin:0,reservation:true},
  {id:1425,name:"Estate 1425",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.425,lng:-117.425,michelin:0,reservation:true},
  {id:1426,name:"Estate 1426",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.426,lng:-117.426,michelin:0,reservation:true},
  {id:1427,name:"Estate 1427",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.427,lng:-117.427,michelin:0,reservation:true},
  {id:1428,name:"Estate 1428",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.428,lng:-117.428,michelin:0,reservation:true},
  {id:1429,name:"Estate 1429",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.429,lng:-117.429,michelin:0,reservation:true},
  {id:1430,name:"Estate 1430",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.43,lng:-117.43,michelin:0,reservation:true},
  {id:1431,name:"Estate 1431",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.431,lng:-117.431,michelin:0,reservation:true},
  {id:1432,name:"Estate 1432",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.432,lng:-117.432,michelin:0,reservation:true},
  {id:1433,name:"Estate 1433",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.433,lng:-117.433,michelin:0,reservation:true},
  {id:1434,name:"Estate 1434",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.434,lng:-117.434,michelin:0,reservation:true},
  {id:1435,name:"Estate 1435",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.435,lng:-117.435,michelin:0,reservation:true},
  {id:1436,name:"Estate 1436",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.436,lng:-117.436,michelin:0,reservation:true},
  {id:1437,name:"Estate 1437",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.437,lng:-117.437,michelin:0,reservation:true},
  {id:1438,name:"Estate 1438",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.438,lng:-117.438,michelin:0,reservation:true},
  {id:1439,name:"Estate 1439",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.439,lng:-117.439,michelin:0,reservation:true},
  {id:1440,name:"Estate 1440",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.44,lng:-117.44,michelin:0,reservation:true},
  {id:1441,name:"Estate 1441",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.441,lng:-117.441,michelin:0,reservation:true},
  {id:1442,name:"Estate 1442",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.442,lng:-117.442,michelin:0,reservation:true},
  {id:1443,name:"Estate 1443",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.443,lng:-117.443,michelin:0,reservation:true},
  {id:1444,name:"Estate 1444",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.444,lng:-117.444,michelin:0,reservation:true},
  {id:1445,name:"Estate 1445",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.445,lng:-117.445,michelin:0,reservation:true},
  {id:1446,name:"Estate 1446",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.446,lng:-117.446,michelin:0,reservation:true},
  {id:1447,name:"Estate 1447",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.447,lng:-117.447,michelin:0,reservation:true},
  {id:1448,name:"Estate 1448",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.448,lng:-117.448,michelin:0,reservation:true},
  {id:1449,name:"Estate 1449",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.449,lng:-117.449,michelin:0,reservation:true},
  {id:1450,name:"Estate 1450",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.45,lng:-117.45,michelin:0,reservation:true},
  {id:1451,name:"Estate 1451",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.451,lng:-117.451,michelin:0,reservation:true},
  {id:1452,name:"Estate 1452",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.452,lng:-117.452,michelin:0,reservation:true},
  {id:1453,name:"Estate 1453",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.453,lng:-117.453,michelin:0,reservation:true},
  {id:1454,name:"Estate 1454",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.454,lng:-117.454,michelin:0,reservation:true},
  {id:1455,name:"Estate 1455",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.455,lng:-117.455,michelin:0,reservation:true},
  {id:1456,name:"Estate 1456",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.456,lng:-117.456,michelin:0,reservation:true},
  {id:1457,name:"Estate 1457",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.457,lng:-117.457,michelin:0,reservation:true},
  {id:1458,name:"Estate 1458",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.458,lng:-117.458,michelin:0,reservation:true},
  {id:1459,name:"Estate 1459",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.459,lng:-117.459,michelin:0,reservation:true},
  {id:1460,name:"Estate 1460",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.46,lng:-117.46,michelin:0,reservation:true},
  {id:1461,name:"Estate 1461",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.461,lng:-117.461,michelin:0,reservation:true},
  {id:1462,name:"Estate 1462",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.462,lng:-117.462,michelin:0,reservation:true},
  {id:1463,name:"Estate 1463",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.463,lng:-117.463,michelin:0,reservation:true},
  {id:1464,name:"Estate 1464",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.464,lng:-117.464,michelin:0,reservation:true},
  {id:1465,name:"Estate 1465",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.465,lng:-117.465,michelin:0,reservation:true},
  {id:1466,name:"Estate 1466",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.466,lng:-117.466,michelin:0,reservation:true},
  {id:1467,name:"Estate 1467",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.467,lng:-117.467,michelin:0,reservation:true},
  {id:1468,name:"Estate 1468",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.468,lng:-117.468,michelin:0,reservation:true},
  {id:1469,name:"Estate 1469",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.469,lng:-117.469,michelin:0,reservation:true},
  {id:1470,name:"Estate 1470",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.47,lng:-117.47,michelin:0,reservation:true},
  {id:1471,name:"Estate 1471",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.471000000000004,lng:-117.471,michelin:0,reservation:true},
  {id:1472,name:"Estate 1472",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.472,lng:-117.472,michelin:0,reservation:true},
  {id:1473,name:"Estate 1473",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.473,lng:-117.473,michelin:0,reservation:true},
  {id:1474,name:"Estate 1474",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.474,lng:-117.474,michelin:0,reservation:true},
  {id:1475,name:"Estate 1475",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.475,lng:-117.475,michelin:0,reservation:true},
  {id:1476,name:"Estate 1476",type:"real-estate",category:"Luxury Property",region:"Baja California",city:"Various",description:"Luxury estate. Ocean views, modern amenities, and prime location.",phone:"+52 646 340 2686",price:"$$$$",fee:5000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:32.476,lng:-117.476,michelin:0,reservation:true},
  {id:1477,name:"Casa del Caracol",type:"real-estate",category:"Ultra-Luxury Oceanfront",region:"Ensenada",city:"Ensenada",description:"$15M oceanfront masterpiece. 12,000 SF, 8 bed, 10 bath. 2.5 acres with beach access, infinity pools, wine cellar, spa.",phone:"+52 646 340 2686",price:"$$$$",fee:15000000,website:"enjoybaja.com",photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",lat:31.8333,lng:-116.6167,michelin:0,reservation:true}
];

export default function BajaLuxuryGuide() {
  const [language, setLanguage] = useState("english");
  const [establishments, setEstablishments] = useState(BAJA_POI_DATA);
  const [activeTab, setActiveTab] = useState("guide");
  const [magazinePage, setMagazinePage] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // NEW FEATURES: Modal and Filter States
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);
  
  const musicUrls = [
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    "https://cdn.pixabay.com/download/audio/2021/11/25/audio_cb5c4e5442.mp3",
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3"
  ];
  
  const musicUrl = musicUrls[currentTrackIndex];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setEstablishments(BAJA_POI_DATA);
  }, []);

  // Music Player Controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.25;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const labels = {
    english: {
      slogan: "Where the Stars Come to Shine",
      header: "BAJA CALIFORNIA",
      sub: "THE LUXURY GUIDE",
      establishments: "Curated Establishments",
      toggle: "ES",
      tabs: { guide: "Guide", magazine: "Magazine", journal: "Journal", foodjournal: "Food Journal", winecellar: "Wine Cellar", partners: "Partners", collection: "Collection", advertise: "Advertise" },
      all: "All Establishments",
      wineries: "Wineries",
      restaurants: "Restaurants",
      hotels: "Hotels",
      spas: "Spas",
      golf: "Golf",
      breweries: "Breweries",
      cigarBars: "Cigar Bars",
      yachts: "Yachts",
      adventures: "Adventures",
      featured: {
        winery: "Winery",
        dish: "Cuisine",
        cocktail: "Mixology",
        hotel: "Residence",
        experience: "Adventure",
        chef: "Culinary"
      },
      newsletter: {
        title: "The Inner Circle",
        subtitle: "Receive exclusive access to Baja's most coveted experiences",
        placeholder: "Your email address",
        button: "Subscribe",
        success: "Welcome to the circle"
      },
      journal: {
        title: "The Journal",
        subtitle: "Perspectives on Baja California",
        readMore: "Continue Reading"
      },
      magazine: {
        title: "Digital Edition",
        subtitle: "Winter 2026",
        page: "Page"
      },
      partners: {
        title: "Partnership Inquiries",
        subtitle: "For distinguished brands seeking elevated exposure in Baja California's premier luxury market",
        cta: "Begin Conversation",
        benefits: ["Editorial Feature", "Magazine Placement", "Newsletter Inclusion", "Private Events"]
      },
      foodjournal: {
        title: "Food Journal",
        subtitle: "A Culinary Alliance — USA & Mexico",
        description: "A collaborative space for food writers, chefs, and culinary enthusiasts to share stories about cuisine, restaurants, and food experiences across the border.",
        contribute: "Share Your Story",
        guidelines: "Submission Guidelines",
        categories: ["Restaurant Reviews", "Chef Profiles", "Street Food", "Wine & Spirits", "Recipes", "Food Travel"],
        cta: "Submit Contribution",
        featured: "Featured Contributors",
        recent: "Recent Stories",
        placeholder: {
          name: "Your Name",
          email: "Your Email",
          title: "Story Title",
          category: "Select Category",
          content: "Share your culinary story... (minimum 300 words)",
          image: "Drag & drop images or click to upload"
        },
        success: "Thank you! Your contribution has been submitted for review.",
        note: "All submissions are reviewed by our editorial team. Selected stories will be featured in our Food Journal and may be included in our quarterly magazine."
      },
      winecellar: {
        title: "The Wine Cellar",
        subtitle: "Valle de Guadalupe & Beyond",
        description: "Discover Mexico's finest wines from the prestigious Valle de Guadalupe wine region",
        explore: "Explore Collection",
        featured: "Featured Wineries",
        wines: "Notable Wines",
        reserve: "Reserve a Tasting",
        visit: "Plan Your Visit",
        varieties: ["Tempranillo", "Nebbiolo", "Cabernet Sauvignon", "Grenache", "Chardonnay", "Sauvignon Blanc"],
        regions: ["Valle de Guadalupe", "Valle de Santo Tomás", "San Antonio de las Minas", "Ojos Negros"]
      }
    ,
      collection: {
        title: "The Collection",
        subtitle: "Curated Luxury Goods & Services"
      },
      advertise: {
        title: "Advertise with Us",
        subtitle: "Reach Baja California's Affluent Audience"
      }
    },
    spanish: {
      slogan: "Donde las Estrellas Vienen a Brillar",
      header: "BAJA CALIFORNIA",
      sub: "LA GUIA DE LUJO",
      establishments: "Establecimientos Selectos",
      toggle: "EN",
      tabs: { guide: "Guia", magazine: "Revista", journal: "Diario", foodjournal: "Diario Culinario", winecellar: "Cava de Vinos", partners: "Socios", collection: "Colección", advertise: "Anunciar" },
      all: "Todos",
      wineries: "Vinicolas",
      restaurants: "Restaurantes",
      hotels: "Hoteles",
      spas: "Spas",
      golf: "Golf",
      breweries: "Cervecerias",
      cigarBars: "Puros",
      yachts: "Yates",
      adventures: "Aventuras",
      featured: {
        winery: "Vinedo",
        dish: "Gastronomia",
        cocktail: "Mixologia",
        hotel: "Residencia",
        experience: "Aventura",
        chef: "Culinario"
      },
      newsletter: {
        title: "El Circulo Interno",
        subtitle: "Recibe acceso exclusivo a las experiencias mas codiciadas de Baja",
        placeholder: "Tu correo electronico",
        button: "Suscribirse",
        success: "Bienvenido al circulo"
      },
      journal: {
        title: "El Diario",
        subtitle: "Perspectivas sobre Baja California",
        readMore: "Continuar Leyendo"
      },
      magazine: {
        title: "Edicion Digital",
        subtitle: "Invierno 2026",
        page: "Pagina"
      },
      partners: {
        title: "Consultas de Asociacion",
        subtitle: "Para marcas distinguidas que buscan exposicion elevada en el mercado de lujo de Baja California",
        cta: "Iniciar Conversacion",
        benefits: ["Articulo Editorial", "Ubicacion en Revista", "Inclusion en Newsletter", "Eventos Privados"]
      },
      foodjournal: {
        title: "Diario Culinario",
        subtitle: "Una Alianza Culinaria — USA y México",
        description: "Un espacio colaborativo para escritores gastronómicos, chefs y entusiastas culinarios para compartir historias sobre cocina, restaurantes y experiencias gastronómicas a través de la frontera.",
        contribute: "Comparte Tu Historia",
        guidelines: "Guías de Envío",
        categories: ["Reseñas de Restaurantes", "Perfiles de Chefs", "Comida Callejera", "Vino y Licores", "Recetas", "Viajes Gastronómicos"],
        cta: "Enviar Contribución",
        featured: "Colaboradores Destacados",
        recent: "Historias Recientes",
        placeholder: {
          name: "Tu Nombre",
          email: "Tu Correo",
          title: "Título de la Historia",
          category: "Selecciona Categoría",
          content: "Comparte tu historia culinaria... (mínimo 300 palabras)",
          image: "Arrastra y suelta imágenes o haz clic para subir"
        },
        success: "¡Gracias! Tu contribución ha sido enviada para revisión.",
        note: "Todas las contribuciones son revisadas por nuestro equipo editorial. Las historias seleccionadas aparecerán en nuestro Diario Culinario y podrían incluirse en nuestra revista trimestral."
      },
      winecellar: {
        title: "La Cava de Vinos",
        subtitle: "Valle de Guadalupe y Más Allá",
        description: "Descubre los mejores vinos de México de la prestigiosa región vinícola del Valle de Guadalupe",
        explore: "Explorar Colección",
        featured: "Bodegas Destacadas",
        wines: "Vinos Notables",
        reserve: "Reservar Cata",
        visit: "Planea Tu Visita",
        varieties: ["Tempranillo", "Nebbiolo", "Cabernet Sauvignon", "Grenache", "Chardonnay", "Sauvignon Blanc"],
        regions: ["Valle de Guadalupe", "Valle de Santo Tomás", "San Antonio de las Minas", "Ojos Negros"]
      }
    },
  };

  const t = labels[language];

  // REAL IMAGES FROM ACTUAL ESTABLISHMENTS - 12 items for 4x3 grid
  const featuredContent = [
    {
      key: 'boutique',
      name: "Hotel Boutique",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english' 
        ? "Contemporary hacienda style retreat with Fuego restaurant and full spa."
        : "Retiro estilo hacienda contemporanea con restaurante Fuego y spa completo.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      website: "https://hotelboutiquevalledeguadalupe.com"
    },
    {
      key: 'bottega',
      name: "Hotel Bottega",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english'
        ? "Small boutique hotel steps from Finca Altozano and Laja restaurant."
        : "Pequeno hotel boutique a pasos de Finca Altozano y restaurante Laja.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
      website: "https://hotelbottegaboutique.com"
    },
    {
      key: 'entrevinedos',
      name: "Entre Viñedos",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english'
        ? "Mediterranean-style family rooms with vineyard and mountain views."
        : "Habitaciones familiares estilo mediterraneo con vistas a vinedos y montanas.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
      website: "https://hotelentrevinedos.com"
    },
    {
      key: 'cuatro',
      name: "Cuatro Cuatros",
      location: "Valle de Guadalupe",
      category: "HOTEL",
      description: language === 'english'
        ? "Cliffside luxury where vineyard meets Pacific with infinity ocean views."
        : "Lujo en acantilados donde el vinedo se encuentra con el Pacifico.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      website: "https://cuatrocuatros.com"
    },
    {
      key: 'fuego',
      name: "Fuego Restaurant",
      location: "Valle de Guadalupe",
      category: "RESTAURANT",
      description: language === 'english'
        ? "Rooftop dining with live music, local wines and Baja Med cuisine."
        : "Comedor en azotea con musica en vivo, vinos locales y cocina Baja Med.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
      website: "https://fuegococinadelvalle.com"
    },
    {
      key: 'fauna',
      name: "Fauna",
      location: "Valle de Guadalupe",
      category: "RESTAURANT",
      description: language === 'english'
        ? "Chef David Castro Hussong's acclaimed cuisine at Bruma winery estate."
        : "La aclamada cocina del Chef David Castro Hussong en la bodega Bruma.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      website: "https://bruma.mx/fauna"
    },
    {
      key: 'finca',
      name: "Finca Altozano",
      location: "Valle de Guadalupe",
      category: "RESTAURANT",
      description: language === 'english'
        ? "Open-air wood-fired cooking with valley views by Chef Javier Plascencia."
        : "Cocina a lena al aire libre con vistas al valle del Chef Javier Plascencia.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
      website: "https://fincaaltozano.com"
    },
    {
      key: 'animalon',
      name: "Animalon",
      location: "Valle de Guadalupe",
      category: "MIXOLOGY",
      description: language === 'english'
        ? "Wood-fired cuisine with Baja's finest local ingredients and craft cocktails."
        : "Cocina a lena con los mejores ingredientes locales y cocteles artesanales.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
      website: "https://animalon.mx"
    },
    {
      key: 'monte',
      name: "Monte Xanic",
      location: "Valle de Guadalupe",
      category: "WINERY",
      description: language === 'english' 
        ? "Mexico's first boutique winery since 1988. The Gran Ricardo defines Baja wine."
        : "La primera bodega boutique de Mexico desde 1988. Gran Ricardo define el vino de Baja.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
      website: "https://montexanic.com.mx"
    },
    {
      key: 'venacava',
      name: "Vena Cava",
      location: "Valle de Guadalupe",
      category: "WINERY",
      description: language === 'english'
        ? "Iconic boat-hull architecture winery with exceptional wines and views."
        : "Bodega con arquitectura iconica de casco de barco, vinos excepcionales y vistas.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80",
      website: "https://venacavawine.com"
    },
    {
      key: 'whale',
      name: "Kuyima Whale Watching",
      location: "San Ignacio Lagoon",
      category: "ADVENTURE",
      description: language === 'english'
        ? "Touch gray whales in their UNESCO World Heritage winter sanctuary."
        : "Toca ballenas grises en su santuario UNESCO de invierno.",
      image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80",
      website: "https://kuyima.com"
    },
    {
      key: 'mision',
      name: "Mision 19",
      location: "Tijuana",
      category: "CULINARY",
      description: language === 'english'
        ? "Chef Javier Plascencia's flagship. The birthplace of Baja Med cuisine."
        : "El restaurante insignia del Chef Plascencia. La cuna de la cocina Baja Med.",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80",
      website: "https://mision19.com"
    }
  ];

  const journalArticles = [
    {
      title: language === 'english' ? "The New Geography of Desire" : "La Nueva Geografia del Deseo",
      excerpt: language === 'english' 
        ? "How Valle de Guadalupe became the destination for those who've seen everything else."
        : "Como Valle de Guadalupe se convirtio en el destino para quienes ya lo han visto todo.",
      date: language === 'english' ? "January 2026" : "Enero 2026",
      category: language === 'english' ? "Wine & Culture" : "Vino y Cultura",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80"
    },
    {
      title: language === 'english' ? "Architecture of Escape" : "Arquitectura del Escape",
      excerpt: language === 'english'
        ? "Inside the private compounds reshaping Baja's coastline. Where minimalism meets the infinite horizon."
        : "Dentro de los complejos privados que remodelan la costa de Baja. Donde el minimalismo se encuentra con el horizonte infinito.",
      date: language === 'english' ? "January 2026" : "Enero 2026",
      category: language === 'english' ? "Design" : "Diseno",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
    },
    {
      title: language === 'english' ? "The Investment Thesis" : "La Tesis de Inversion",
      excerpt: language === 'english'
        ? "Why institutional capital is flowing into Baja California's luxury corridor."
        : "Por que el capital institucional fluye hacia el corredor de lujo de Baja California.",
      date: language === 'english' ? "December 2025" : "Diciembre 2025",
      category: language === 'english' ? "Markets" : "Mercados",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    }
  ];

  const magazinePages = [
    {
      type: "cover",
      title: "BAJA",
      subtitle: language === 'english' ? "THE PENINSULA ISSUE" : "LA EDICION DE LA PENINSULA",
      content: language === 'english' ? "Winter 2026" : "Invierno 2026",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
    },
    {
      type: "editorial",
      title: language === 'english' ? "EDITOR'S NOTE" : "NOTA DEL EDITOR",
      content: language === 'english' 
        ? "Baja California exists in that rare space between discovery and preservation. Those who find it understand immediately why it must be protected. This edition explores the peninsula through the lens of those who've chosen to call it home."
        : "Baja California existe en ese raro espacio entre el descubrimiento y la preservacion. Quienes la encuentran comprenden de inmediato por que debe ser protegida. Esta edicion explora la peninsula a traves de quienes han elegido llamarla hogar.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80"
    },
    {
      type: "feature",
      title: language === 'english' ? "TERROIR" : "TERROIR",
      content: language === 'english' 
        ? "The unique combination of Pacific marine influence, Mediterranean climate, and volcanic soil creates wines found nowhere else on earth. Valle de Guadalupe's 200+ wineries represent the vanguard of Mexican viticulture."
        : "La combinacion unica de influencia marina del Pacifico, clima mediterraneo y suelo volcanico crea vinos que no se encuentran en ningun otro lugar del mundo. Las mas de 200 bodegas de Valle de Guadalupe representan la vanguardia de la viticultura mexicana.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80"
    },
    {
      type: "feature",
      title: language === 'english' ? "THE SHORE" : "LA COSTA",
      content: language === 'english' 
        ? "One thousand miles of coastline. From the sophisticated beach culture of Rosarito to the untouched wilderness of Bahia de los Angeles, the Baja coast offers solitude impossible to find elsewhere."
        : "Mil millas de costa. Desde la sofisticada cultura de playa de Rosarito hasta la naturaleza virgen de Bahia de los Angeles, la costa de Baja ofrece una soledad imposible de encontrar en otro lugar.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80"
    },
    {
      type: "feature",
      title: language === 'english' ? "GOLF PARADISE" : "PARAISO DEL GOLF",
      content: language === 'english' 
        ? "Championship courses designed by legends. Tiger Woods, Jack Nicklaus, and Greg Norman have all left their mark on Baja's fairways. Where every round comes with ocean views."
        : "Campos de campeonato disenados por leyendas. Tiger Woods, Jack Nicklaus y Greg Norman han dejado su huella en los fairways de Baja. Donde cada ronda viene con vistas al oceano.",
      image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80"
    },
    {
      type: "close",
      title: language === 'english' ? "CONTACT" : "CONTACTO",
      content: "+52 646 340 2686\ninfo@enjoybaja.com",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
    }
  ];

  const groupByRegion = () => {
    const grouped = {};
    establishments.forEach(est => {
      const region = est.region || 'Unknown';
      if (!grouped[region]) grouped[region] = [];
      grouped[region].push(est);
    });
    return grouped;
  };

  const grouped = groupByRegion();
  const regions = Object.keys(grouped).sort();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const tabStyle = (isActive) => ({
    padding: isMobile ? '12px 16px' : '16px 32px',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #cba658' : '2px solid transparent',
    color: isActive ? '#cba658' : '#e2e8f0',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '3px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textTransform: 'uppercase'
  });

  const typeLabels = {
    winery: language === 'english' ? 'Winery' : 'Vinicola',
    restaurant: language === 'english' ? 'Restaurant' : 'Restaurante',
    hotel: language === 'english' ? 'Hotel' : 'Hotel',
    golf: language === 'english' ? 'Golf' : 'Golf',
    spa: language === 'english' ? 'Spa' : 'Spa',
    brewery: language === 'english' ? 'Brewery' : 'Cerveceria',
    yacht: language === 'english' ? 'Marina' : 'Marina',
    'cigar-bar': language === 'english' ? 'Cigar Bar' : 'Bar de Puros',
    rooftop: language === 'english' ? 'Rooftop' : 'Terraza',
    'beach-club': language === 'english' ? 'Beach Club' : 'Club de Playa',
    nightclub: language === 'english' ? 'Nightclub' : 'Club Nocturno',
    adventure: language === 'english' ? 'Adventure' : 'Aventura',
    gallery: language === 'english' ? 'Gallery' : 'Galeria',
    salon: language === 'english' ? 'Salon' : 'Salon',
    casino: language === 'english' ? 'Casino' : 'Casino',
    shopping: language === 'english' ? 'Shopping' : 'Compras',
    'pool-hall': language === 'english' ? 'Pool Hall' : 'Billar',
    aviation: language === 'english' ? 'Aviation' : 'Aviacion',
    'real-estate': language === 'english' ? 'Real Estate' : 'Bienes Raices'
  };

  // NEW FEATURE: Category count calculator
  const getCategoryCount = (type) => {
    if (type === 'all') return establishments.length;
    return establishments.filter(est => est.type === type).length;
  };

  // NEW FEATURE: Category tabs configuration
  const categoryTabs = [
    { key: 'all', label: t.all || 'All' },
    { key: 'winery', label: t.wineries },
    { key: 'restaurant', label: t.restaurants },
    { key: 'hotel', label: t.hotels },
    { key: 'spa', label: t.spas },
    { key: 'golf', label: t.golf },
    { key: 'brewery', label: t.breweries },
    { key: 'cigar-bar', label: t.cigarBars },
    { key: 'rooftop', label: language === 'english' ? 'Rooftops' : 'Terrazas' },
    { key: 'beach-club', label: language === 'english' ? 'Beach Clubs' : 'Clubes de Playa' },
    { key: 'nightclub', label: language === 'english' ? 'Nightclubs' : 'Clubes Nocturnos' },
    { key: 'yacht', label: t.yachts },
    { key: 'adventure', label: t.adventures },
    { key: 'gallery', label: language === 'english' ? 'Galleries' : 'Galerías' },
    { key: 'salon', label: language === 'english' ? 'Salons' : 'Salones' },
    { key: 'casino', label: language === 'english' ? 'Casinos' : 'Casinos' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#334155',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* NEW FEATURE: MODULE NAVIGATION BAR */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <ModuleNavBar />
      </div>
      
      {/* VINEYARD BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.55,
        zIndex: 0
      }} />

      {/* LIGHTER OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(51,65,85,0.25) 0%, rgba(51,65,85,0.35) 50%, rgba(51,65,85,0.45) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* SCROLLING PARTNER IMAGES */}
      <div style={{
        position: 'fixed',
        bottom: '100px',
        left: 0,
        right: 0,
        height: '120px',
        overflow: 'hidden',
        zIndex: 2,
        background: 'linear-gradient(to right, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.08) 10%, rgba(15,23,42,0.08) 90%, rgba(15,23,42,0.15) 100%)',
        backdropFilter: 'blur(8px)'
      }}>
        <p style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '9px',
          color: '#cba658',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          zIndex: 3
        }}>
          Featured Partners
        </p>
        <div style={{
          display: 'flex',
          gap: '20px',
          animation: 'scrollPartners 90s linear infinite',
          paddingTop: '32px',
          width: 'max-content'
        }}>
          {[
            { name: 'Monte Xanic', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
            { name: 'L.A. Cetto', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
            { name: 'Adobe Guadalupe', img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
            { name: 'Vena Cava', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80' },
            { name: 'Bruma Resort', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
            { name: 'Animalon', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
            { name: 'Damiana', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
            { name: 'Conchas de Piedra', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
            { name: 'Lunario', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80' },
            { name: 'Fauna Restaurant', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
            { name: 'Corazón de Tierra', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Finca Altozano', img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80' },
            { name: 'One&Only Palmilla', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
            { name: 'Las Ventanas', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
            { name: 'Capella Pedregal', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80' },
            { name: 'Nobu Los Cabos', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80' },
            { name: 'Montage Los Cabos', img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80' },
            { name: 'El Cielo Winery', img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80' },
            { name: 'Lechuza Vineyard', img: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&q=80' },
            { name: 'Baron Balche', img: 'https://images.unsplash.com/photo-1586037777555-035f7e9fb109?w=400&q=80' },
            { name: 'Encuentro Guadalupe', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80' },
            { name: 'Cava Maciel', img: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=400&q=80' },
            { name: 'Decantos', img: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=400&q=80' },
            { name: 'Vinisterra', img: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?w=400&q=80' },
            { name: 'Sol de Medianoche', img: 'https://images.unsplash.com/photo-1569097473749-93aa00a0dada?w=400&q=80' },
            { name: 'Wendlandt Cerveceria', img: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&q=80' },
            { name: 'Agua Mala Brewery', img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80' },
            { name: 'Border Psycho', img: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&q=80' },
            { name: 'Insurgente', img: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=400&q=80' },
            { name: 'Mamut Brewery', img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=80' },
            { name: 'Quivira Golf Club', img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80' },
            { name: 'Cabo del Sol', img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80' },
            { name: 'Palmilla Golf', img: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=400&q=80' },
            { name: 'Puerto Los Cabos', img: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=400&q=80' },
            { name: 'Diamante Cabo', img: 'https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=400&q=80' },
            { name: 'Flora Farms', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
            { name: 'Sunset Monalisa', img: 'https://images.unsplash.com/photo-1512132411229-c30391241dd8?w=400&q=80' },
            { name: 'Nick San', img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' },
            { name: 'El Farallon', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
            { name: 'Manta at The Cape', img: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&q=80' },
            { name: 'Deckman en el Mogor', img: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&q=80' },
            { name: 'Restaurante Laja', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Primitivo', img: 'https://images.unsplash.com/photo-1554679665-f5537f187268?w=400&q=80' },
            { name: 'La Guerrerense', img: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&q=80' },
            { name: 'Hussongs Cantina', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' },
            { name: 'Chateau Camou', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80' },
            { name: 'Casa de Piedra', img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&q=80' },
            { name: 'Finca La Carrodilla', img: 'https://images.unsplash.com/photo-1595475884562-073c5ab8ec29?w=400&q=80' },
            { name: 'Bodegas Magoni', img: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&q=80' },
            { name: 'Torres Alegre', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' }
          ].concat([
            { name: 'Monte Xanic', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
            { name: 'L.A. Cetto', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
            { name: 'Adobe Guadalupe', img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
            { name: 'Vena Cava', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80' },
            { name: 'Bruma Resort', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
            { name: 'Animalon', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
            { name: 'Damiana', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
            { name: 'Conchas de Piedra', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
            { name: 'Lunario', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80' },
            { name: 'Fauna Restaurant', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
            { name: 'Corazón de Tierra', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Finca Altozano', img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80' },
            { name: 'One&Only Palmilla', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
            { name: 'Las Ventanas', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
            { name: 'Capella Pedregal', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80' },
            { name: 'Nobu Los Cabos', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80' },
            { name: 'Montage Los Cabos', img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80' },
            { name: 'El Cielo Winery', img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80' },
            { name: 'Lechuza Vineyard', img: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&q=80' },
            { name: 'Baron Balche', img: 'https://images.unsplash.com/photo-1586037777555-035f7e9fb109?w=400&q=80' },
            { name: 'Encuentro Guadalupe', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80' },
            { name: 'Cava Maciel', img: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=400&q=80' },
            { name: 'Decantos', img: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=400&q=80' },
            { name: 'Vinisterra', img: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?w=400&q=80' },
            { name: 'Sol de Medianoche', img: 'https://images.unsplash.com/photo-1569097473749-93aa00a0dada?w=400&q=80' },
            { name: 'Wendlandt Cerveceria', img: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&q=80' },
            { name: 'Agua Mala Brewery', img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80' },
            { name: 'Border Psycho', img: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&q=80' },
            { name: 'Insurgente', img: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=400&q=80' },
            { name: 'Mamut Brewery', img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=80' },
            { name: 'Quivira Golf Club', img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80' },
            { name: 'Cabo del Sol', img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80' },
            { name: 'Palmilla Golf', img: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=400&q=80' },
            { name: 'Puerto Los Cabos', img: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=400&q=80' },
            { name: 'Diamante Cabo', img: 'https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=400&q=80' },
            { name: 'Flora Farms', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
            { name: 'Sunset Monalisa', img: 'https://images.unsplash.com/photo-1512132411229-c30391241dd8?w=400&q=80' },
            { name: 'Nick San', img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' },
            { name: 'El Farallon', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
            { name: 'Manta at The Cape', img: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&q=80' },
            { name: 'Deckman en el Mogor', img: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&q=80' },
            { name: 'Restaurante Laja', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Primitivo', img: 'https://images.unsplash.com/photo-1554679665-f5537f187268?w=400&q=80' },
            { name: 'La Guerrerense', img: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&q=80' },
            { name: 'Hussongs Cantina', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' },
            { name: 'Chateau Camou', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80' },
            { name: 'Casa de Piedra', img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&q=80' },
            { name: 'Finca La Carrodilla', img: 'https://images.unsplash.com/photo-1595475884562-073c5ab8ec29?w=400&q=80' },
            { name: 'Bodegas Magoni', img: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&q=80' },
            { name: 'Torres Alegre', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' }
          ]).map((partner, i) => (
            <div key={i} style={{ 
              width: '140px', 
              height: '80px', 
              position: 'relative',
              flexShrink: 0
            }}>
              <img 
                src={partner.img} 
                alt={partner.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid rgba(203,166,88,0.3)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.35)',
                padding: '6px 10px'
              }}>
                <p style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  fontWeight: '500',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>{partner.name}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scrollPartners {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* AUDIO ELEMENT */}
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        onError={() => {
          if (currentTrackIndex < musicUrls.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
          }
        }}
      />

      {/* MUSIC PLAYER */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(51,65,85,0.9)',
        backdropFilter: 'blur(10px)',
        padding: '12px 16px',
        border: '1px solid rgba(203,166,88,0.3)'
      }}>
        <button onClick={togglePlay} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
          {isPlaying ? <Pause size={20} color="#cba658" /> : <Play size={20} color="#cba658" />}
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: '10px', color: '#cba658', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {isPlaying ? 'NOW PLAYING' : 'LATIN JAZZ'}
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Baja Vibes</span>
        </div>
        <button onClick={toggleMute} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, marginLeft: 8 }}>
          {isMuted ? <VolumeX size={18} color="#64748b" /> : <Volume2 size={18} color="#94a3b8" />}
        </button>
      </div>

      <div style={{ 
        maxWidth: '1100px', 
        margin: '0 auto', 
        padding: isMobile ? '40px 20px' : '80px 40px',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* HEADER */}
        <header style={{
          textAlign: 'center',
          marginBottom: isMobile ? '60px' : '100px',
          position: 'relative'
        }}>
          <button
            onClick={() => setLanguage(language === "english" ? "spanish" : "english")}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(203,166,88,0.4)',
              color: '#cba658',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#cba658';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#cba658';
            }}
          >
            {t.toggle}
          </button>

          <p style={{
            fontSize: '10px',
            color: '#cba658',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }}>
            {t.slogan}
          </p>

          <h1 style={{
            fontSize: isMobile ? '36px' : '72px',
            fontWeight: '200',
            color: '#e2e8f0',
            letterSpacing: isMobile ? '8px' : '16px',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            {t.header}
          </h1>

          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#94a3b8',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            {t.sub}
          </p>

          <div style={{
            width: '60px',
            height: '1px',
            background: '#cba658',
            margin: '0 auto 24px'
          }} />

          {/* NEW FEATURE: Category statistics */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#cbd5e1' }}>
                {getCategoryCount('winery')}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                {t.wineries}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid #94a3b8', height: '50px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#cba658' }}>
                {getCategoryCount('restaurant')}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                {t.restaurants}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid #94a3b8', height: '50px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#cbd5e1' }}>
                {getCategoryCount('hotel')}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                {t.hotels}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid #94a3b8', height: '50px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#cba658' }}>
                {establishments.filter(e => e.michelin > 0).length}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                MICHELIN ⭐
              </div>
            </div>
          </div>

          <p style={{
            fontSize: '11px',
            color: '#cba658',
            letterSpacing: '3px',
            marginTop: '30px',
            fontWeight: '600'
          }}>
            {establishments.length} {t.establishments}
          </p>
        </header>

        {/* NAVIGATION */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          marginBottom: '60px',
          borderBottom: '1px solid rgba(148,163,184,0.2)'
        }}>
          {Object.entries(t.tabs).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={tabStyle(activeTab === key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ==================== GUIDE TAB ==================== */}
        {activeTab === "guide" && (
          <>
            {/* STICKY FILTER BAR */}
            <div style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              background: 'rgba(0,0,0,0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '20px 0',
              marginLeft: '-40px',
              marginRight: '-40px',
              marginTop: '-80px',
              marginBottom: '60px'
            }}>
              <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                padding: '0 24px',
                flexWrap: 'wrap'
              }}>
                {categoryTabs.map(({key, label}) => {
                  const count = key === 'all' ? establishments.length : establishments.filter(b => b.type === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setCategoryFilter(key)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: categoryFilter === key ? '#cba658' : '#ffffff',
                        fontSize: '11px',
                        letterSpacing: '2px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '10px 12px',
                        borderBottom: categoryFilter === key ? '2px solid #cba658' : '2px solid transparent',
                        transition: 'all 0.3s',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {label} <span style={{fontSize: '10px', marginLeft: '4px', opacity: 0.7}}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FEATURED GRID WITH FLOATING ANIMATION & ROUNDED CORNERS (1.0) */}
            <section style={{ marginBottom: '80px' }}>
              <style>{`
                @keyframes float1 {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
                @keyframes float2 {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-15px); }
                }
                @keyframes float3 {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-12px); }
                }
              `}</style>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                gap: '16px'
              }}>
                {featuredContent.map((item, index) => (
                  <article
                    key={item.key}
                    onClick={() => window.open(item.website, '_blank')}
                    onMouseEnter={() => setHoveredCard(item.key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      position: 'relative',
                      height: isMobile ? '280px' : '260px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#ffffff',
                      borderRadius: index % 2 === 0 ? '0' : '12px',
                      animation: `float${(index % 3) + 1} ${4 + (index % 3)}s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredCard === item.key ? 'scale(1.05)' : 'scale(1)'
                    }} />

                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '20px',
                      background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, transparent 100%)'
                    }}>
                      <p style={{
                        fontSize: '8px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                      }}>
                        {item.category}
                      </p>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#e2e8f0',
                        marginBottom: '4px',
                        letterSpacing: '0.5px'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '10px',
                        color: '#94a3b8',
                        marginBottom: '0'
                      }}>
                        {item.location}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* NEW FEATURE: Category filter tabs */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '40px',
              flexWrap: 'wrap',
              background: 'rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '20px 24px'
            }}>
              {categoryTabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: categoryFilter === key ? '#cba658' : '#ffffff',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    padding: '10px 12px',
                    borderBottom: categoryFilter === key ? '2px solid #cba658' : '2px solid transparent',
                    transition: 'all 0.3s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {label} <span style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.7 }}>({getCategoryCount(key)})</span>
                </button>
              ))}
            </div>

            {/* ESTABLISHMENTS - Now with filtered data */}
            <section>
              <Accordion defaultOpen={-1}>
                {regions
                  .filter(region => {
                    const regionEstablishments = grouped[region].filter(est => 
                      categoryFilter === 'all' || est.type === categoryFilter
                    );
                    return regionEstablishments.length > 0;
                  })
                  .map((region) => {
                  const regionEstablishments = grouped[region].filter(est => 
                    categoryFilter === 'all' || est.type === categoryFilter
                  );
                  
                  return (
                    <AccordionItem key={region} title={`${region} — ${regionEstablishments.length}`}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
                        gap: '20px'
                      }}>
                        {regionEstablishments.map(est => (
                          <div 
                            key={est.id} 
                            onClick={() => setSelectedEstablishment(est)}
                            style={{
                              padding: '24px',
                              border: '1px solid rgba(148,163,184,0.15)',
                              background: 'rgba(15,23,42,0.6)',
                              transition: 'all 0.3s',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = 'rgba(203,166,88,0.4)';
                              e.currentTarget.style.background = 'rgba(15,23,42,0.8)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)';
                              e.currentTarget.style.background = 'rgba(15,23,42,0.6)';
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                              <p style={{
                                fontSize: '9px',
                                color: '#cba658',
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                              }}>{typeLabels[est.type] || est.type}</p>
                            </div>
                            <h3 style={{
                              fontSize: '16px',
                              fontWeight: '400',
                              color: '#e2e8f0',
                              marginBottom: '8px',
                              letterSpacing: '0.5px'
                            }}>{est.name}</h3>
                            <p style={{
                              fontSize: '12px',
                              color: '#94a3b8',
                              lineHeight: '1.6',
                              marginBottom: '20px'
                            }}>{est.description || est.city}</p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  est.website && window.open(est.website.startsWith('http') ? est.website : `https://${est.website}`, '_blank');
                                }}
                                style={{
                                  padding: '10px 20px',
                                  background: 'transparent',
                                  border: '1px solid rgba(148,163,184,0.3)',
                                  color: '#94a3b8',
                                  fontSize: '10px',
                                  letterSpacing: '2px',
                                  cursor: 'pointer',
                                  textTransform: 'uppercase',
                                  transition: 'all 0.3s'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = '#cba658';
                                  e.currentTarget.style.color = '#0f172a';
                                  e.currentTarget.style.borderColor = '#cba658';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = '#94a3b8';
                                  e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)';
                                }}
                              >
                                {language === 'english' ? 'Visit' : 'Visitar'}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const msg = language === 'english' ? `Inquiry about ${est.name}` : `Consulta sobre ${est.name}`;
                                  window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                                }}
                                style={{
                                  padding: '10px 20px',
                                  background: 'transparent',
                                  border: '1px solid rgba(148,163,184,0.3)',
                                  color: '#94a3b8',
                                  fontSize: '10px',
                                  letterSpacing: '2px',
                                  cursor: 'pointer',
                                  textTransform: 'uppercase',
                                  transition: 'all 0.3s'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = '#cba658';
                                  e.currentTarget.style.color = '#0f172a';
                                  e.currentTarget.style.borderColor = '#cba658';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = '#94a3b8';
                                  e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)';
                                }}
                              >
                                {language === 'english' ? 'Inquire' : 'Consultar'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </section>

            {/* NEWSLETTER */}
            <section style={{
              padding: isMobile ? '20px 16px' : '20px 32px',
              border: '1px solid rgba(203,166,88,0.2)',
              background: 'rgba(203,166,88,0.05)',
              marginTop: '40px',
              display: 'flex',
              alignItems: isMobile ? 'stretch' : 'center',
              justifyContent: 'center',
              gap: isMobile ? '12px' : '24px',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <p style={{
                fontSize: '9px',
                color: '#cba658',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                margin: 0,
                whiteSpace: 'nowrap'
              }}>
                {t.newsletter.title}
              </p>
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '8px',
                flex: 1,
                maxWidth: '400px'
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'rgba(15,23,42,0.8)',
                    border: '1px solid rgba(148,163,184,0.3)',
                    color: '#e2e8f0',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#cba658'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(148,163,184,0.3)'}
                />
                <button type="submit" style={{
                  padding: '10px 20px',
                  background: subscribed ? '#22c55e' : '#cba658',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}>
                  {subscribed ? '✓' : t.newsletter.button}
                </button>
              </form>
            </section>
          </>
        )}

        {/* ==================== MAGAZINE TAB ==================== */}
        {activeTab === "magazine" && (
          <section>
            <div style={{
              position: 'relative',
              minHeight: isMobile ? '500px' : '600px',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${magazinePages[magazinePage].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4
              }} />

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.9) 100%)'
              }} />

              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: isMobile ? '500px' : '600px',
                padding: isMobile ? '48px 24px' : '80px',
                textAlign: 'center'
              }}>
                {magazinePages[magazinePage].type === 'cover' ? (
                  <>
                    <p style={{ fontSize: '10px', color: '#cba658', letterSpacing: '4px', marginBottom: '40px' }}>
                      {t.magazine.subtitle}
                    </p>
                    <h2 style={{
                      fontSize: isMobile ? '64px' : '120px',
                      fontWeight: '100',
                      color: '#e2e8f0',
                      letterSpacing: '20px',
                      marginBottom: '24px'
                    }}>
                      {magazinePages[magazinePage].title}
                    </h2>
                    <p style={{ fontSize: '12px', color: '#94a3b8', letterSpacing: '4px' }}>
                      {magazinePages[magazinePage].subtitle}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 style={{
                      fontSize: isMobile ? '24px' : '36px',
                      fontWeight: '200',
                      color: '#e2e8f0',
                      letterSpacing: '6px',
                      marginBottom: '40px'
                    }}>
                      {magazinePages[magazinePage].title}
                    </h2>
                    <p style={{
                      fontSize: '15px',
                      color: '#cbd5e1',
                      lineHeight: '2',
                      maxWidth: '600px',
                      whiteSpace: 'pre-line'
                    }}>
                      {magazinePages[magazinePage].content}
                    </p>
                  </>
                )}

                <p style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '32px',
                  fontSize: '10px',
                  color: '#94a3b8',
                  letterSpacing: '2px'
                }}>
                  {magazinePage + 1} / {magazinePages.length}
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '32px'
            }}>
              <button
                onClick={() => magazinePage > 0 && setMagazinePage(magazinePage - 1)}
                disabled={magazinePage === 0}
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(148,163,184,0.3)',
                  color: magazinePage === 0 ? '#475569' : '#94a3b8',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  cursor: magazinePage === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'uppercase'
                }}
              >
                <ChevronLeft size={14} /> {language === 'english' ? 'Previous' : 'Anterior'}
              </button>
              <button
                onClick={() => magazinePage < magazinePages.length - 1 && setMagazinePage(magazinePage + 1)}
                disabled={magazinePage === magazinePages.length - 1}
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(148,163,184,0.3)',
                  color: magazinePage === magazinePages.length - 1 ? '#475569' : '#94a3b8',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  cursor: magazinePage === magazinePages.length - 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'uppercase'
                }}
              >
                {language === 'english' ? 'Next' : 'Siguiente'} <ChevronRight size={14} />
              </button>
            </div>
          </section>
        )}

        {/* ==================== JOURNAL TAB ==================== */}
        {activeTab === "journal" && (
          <section>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '200',
                color: '#e2e8f0',
                letterSpacing: '4px',
                marginBottom: '16px'
              }}>
                {t.journal.title}
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#94a3b8',
                letterSpacing: '2px'
              }}>
                {t.journal.subtitle}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(1, 1fr)',
              gap: '40px'
            }}>
              {journalArticles.map((article, index) => (
                <article key={index} style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(148,163,184,0.15)',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    height: '300px',
                    backgroundImage: `url(${article.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  <div style={{ padding: '32px' }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '16px', 
                      marginBottom: '16px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '9px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                      }}>{article.category}</span>
                      <span style={{
                        fontSize: '9px',
                        color: '#64748b',
                        letterSpacing: '2px'
                      }}>{article.date}</span>
                      <span style={{
                        fontSize: '9px',
                        color: '#64748b',
                        letterSpacing: '2px'
                      }}>{article.readTime}</span>
                    </div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '300',
                      color: '#e2e8f0',
                      marginBottom: '16px',
                      letterSpacing: '1px'
                    }}>{article.title}</h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      lineHeight: '1.8',
                      marginBottom: '24px'
                    }}>{article.excerpt}</p>
                    <button style={{
                      padding: '12px 24px',
                      background: 'transparent',
                      border: '1px solid rgba(203,166,88,0.4)',
                      color: '#cba658',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s'
                    }}>
                      {t.journal.readMore}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ==================== FOOD JOURNAL TAB ==================== */}
        {activeTab === "foodjournal" && (
          <section>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '200',
                color: '#e2e8f0',
                letterSpacing: '4px',
                marginBottom: '16px'
              }}>
                {t.foodjournal.title}
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#94a3b8',
                letterSpacing: '2px',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                {t.foodjournal.subtitle}
              </p>
            </div>

            <div style={{
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid rgba(203,166,88,0.2)',
              padding: isMobile ? '32px 20px' : '48px',
              marginBottom: '60px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#cbd5e1',
                lineHeight: '1.8',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                {t.foodjournal.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                {t.foodjournal.categories.map((cat, i) => (
                  <span key={i} style={{
                    padding: '8px 16px',
                    background: 'rgba(203,166,88,0.1)',
                    border: '1px solid rgba(203,166,88,0.3)',
                    fontSize: '11px',
                    color: '#cba658',
                    letterSpacing: '1px'
                  }}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => window.open(`https://wa.me/526463402686?text=${encodeURIComponent(language === 'english' ? 'Food Journal Submission Inquiry' : 'Consulta de Envío al Diario Culinario')}`, '_blank')}
                style={{
                  padding: '18px 48px',
                  background: '#cba658',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '3px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {t.foodjournal.cta}
              </button>
              <p style={{
                fontSize: '11px',
                color: '#94a3b8',
                marginTop: '24px',
                fontStyle: 'italic'
              }}>
                {t.foodjournal.note}
              </p>
            </div>
          </section>
        )}

        {/* ==================== WINE CELLAR TAB ==================== */}
        {activeTab === "winecellar" && (
          <section>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '200',
                color: '#e2e8f0',
                letterSpacing: '4px',
                marginBottom: '16px'
              }}>
                {t.winecellar.title}
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#94a3b8',
                letterSpacing: '2px',
                maxWidth: '700px',
                margin: '0 auto 24px'
              }}>
                {t.winecellar.subtitle}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#cbd5e1',
                lineHeight: '1.8',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {t.winecellar.description}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '32px',
              marginBottom: '60px'
            }}>
              <div style={{
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(203,166,88,0.2)',
                padding: '32px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '300',
                  color: '#cba658',
                  marginBottom: '20px',
                  letterSpacing: '2px'
                }}>
                  {language === 'english' ? 'Wine Varieties' : 'Variedades de Vino'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {t.winecellar.varieties.map((variety, i) => (
                    <div key={i} style={{
                      padding: '12px',
                      background: 'rgba(203,166,88,0.05)',
                      border: '1px solid rgba(203,166,88,0.2)',
                      fontSize: '13px',
                      color: '#e2e8f0'
                    }}>
                      {variety}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(203,166,88,0.2)',
                padding: '32px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '300',
                  color: '#cba658',
                  marginBottom: '20px',
                  letterSpacing: '2px'
                }}>
                  {language === 'english' ? 'Wine Regions' : 'Regiones Vinícolas'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {t.winecellar.regions.map((region, i) => (
                    <div key={i} style={{
                      padding: '12px',
                      background: 'rgba(203,166,88,0.05)',
                      border: '1px solid rgba(203,166,88,0.2)',
                      fontSize: '13px',
                      color: '#e2e8f0'
                    }}>
                      {region}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => window.open(`https://wa.me/526463402686?text=${encodeURIComponent(language === 'english' ? 'Wine Tasting Reservation Inquiry' : 'Consulta de Reservación de Cata de Vinos')}`, '_blank')}
                style={{
                  padding: '18px 48px',
                  background: '#cba658',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '3px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {t.winecellar.reserve}
              </button>
            </div>
          </section>
        )}

        {/* ==================== PARTNERS TAB WITH U4RIK (2.0) ==================== */}
        {activeTab === "partners" && (
          <section style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '-40px',
              right: '-40px',
              bottom: '-60px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: '80px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <p style={{ 
                    fontSize: '9px', 
                    color: 'rgba(203, 166, 88, 0.6)', 
                    letterSpacing: '6px', 
                    marginBottom: '12px', 
                    textTransform: 'uppercase' 
                  }}>
                    {language === 'english' ? 'FEATURED' : 'DESTACADO'}
                  </p>
                  <h2 style={{ 
                    fontSize: isMobile ? '24px' : '32px', 
                    fontWeight: '100', 
                    color: '#e2e8f0', 
                    letterSpacing: '8px',
                    marginBottom: '8px'
                  }}>
                    {language === 'english' ? 'LIFESTYLE PARTNERS' : 'SOCIOS DE ESTILO'}
                  </h2>
                  <div style={{
                    width: '60px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, #cba658, transparent)',
                    margin: '16px auto'
                  }} />
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)',
                  border: '1px solid rgba(203,166,88,0.3)',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '60px'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(203,166,88,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
                    gap: '0'
                  }}>
                    <div style={{
                      height: isMobile ? '200px' : '280px',
                      backgroundImage: 'url("https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }} />

                    <div style={{
                      padding: isMobile ? '24px 20px' : '28px 36px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <p style={{
                        fontSize: '9px',
                        color: '#cba658',
                        letterSpacing: '3px',
                        marginBottom: '8px',
                        textTransform: 'uppercase'
                      }}>
                        {language === 'english' ? 'PREMIUM SPIRITS' : 'LICORES PREMIUM'}
                      </p>

                      <h3 style={{
                        fontSize: isMobile ? '24px' : '28px',
                        fontWeight: '200',
                        color: '#f1f5f9',
                        letterSpacing: '4px',
                        marginBottom: '4px'
                      }}>
                        U4RIK
                      </h3>
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(203, 166, 88, 0.9)',
                        letterSpacing: '3px',
                        marginBottom: '12px',
                        fontWeight: '300'
                      }}>
                        SPIRITS
                      </p>

                      <p style={{
                        fontSize: '11px',
                        color: '#cbd5e1',
                        lineHeight: '1.7',
                        marginBottom: '16px'
                      }}>
                        {language === 'english' 
                          ? 'Award-winning, family-owned distillery from San Marcos, CA. Grape-based gluten-free vodka. 100% Blue Agave tequilas—Double Gold at World Spirits Competition—aged in American oak.'
                          : 'Destilería familiar galardonada de San Marcos, CA. Vodka libre de gluten a base de uva. Tequilas 100% Agave Azul—Doble Oro en World Spirits Competition—añejados en roble americano.'}
                      </p>

                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginBottom: '20px'
                      }}>
                        <div style={{
                          padding: '4px 10px',
                          background: 'rgba(203,166,88,0.1)',
                          border: '1px solid rgba(203,166,88,0.3)',
                          fontSize: '9px',
                          color: '#cba658',
                          letterSpacing: '1px'
                        }}>
                          Vodka · USA
                        </div>
                        <div style={{
                          padding: '4px 10px',
                          background: 'rgba(203,166,88,0.1)',
                          border: '1px solid rgba(203,166,88,0.3)',
                          fontSize: '9px',
                          color: '#cba658',
                          letterSpacing: '1px'
                        }}>
                          Silver · Mexico
                        </div>
                        <div style={{
                          padding: '4px 10px',
                          background: 'rgba(203,166,88,0.1)',
                          border: '1px solid rgba(203,166,88,0.3)',
                          fontSize: '9px',
                          color: '#cba658',
                          letterSpacing: '1px'
                        }}>
                          Reposado · Mexico
                        </div>
                        <div style={{
                          padding: '4px 10px',
                          background: 'rgba(203,166,88,0.1)',
                          border: '1px solid rgba(203,166,88,0.3)',
                          fontSize: '9px',
                          color: '#cba658',
                          letterSpacing: '1px'
                        }}>
                          Añejo · Mexico
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap'
                      }}>
                        <button
                          onClick={() => window.open('https://wa.me/526463402686?text=Private%20Tasting%20Inquiry%20-%20U4RIK%20Spirits', '_blank')}
                          style={{
                            flex: 1,
                            minWidth: '140px',
                            padding: '12px 20px',
                            background: 'linear-gradient(135deg, #cba658, #b8944d)',
                            border: 'none',
                            color: '#0f172a',
                            fontSize: '10px',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                          }}
                        >
                          {language === 'english' ? 'PRIVATE TASTINGS' : 'CATAS PRIVADAS'}
                        </button>
                        <button
                          onClick={() => window.open('https://wa.me/526463402686?text=Wholesale%20Inquiry%20-%20U4RIK%20Spirits', '_blank')}
                          style={{
                            flex: 1,
                            minWidth: '140px',
                            padding: '12px 20px',
                            background: 'transparent',
                            border: '1px solid rgba(203,166,88,0.5)',
                            color: '#cba658',
                            fontSize: '10px',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                          }}
                        >
                          {language === 'english' ? 'WHOLESALE' : 'MAYOREO'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: isMobile ? '24px' : '32px',
                  fontWeight: '200',
                  color: '#e2e8f0',
                  letterSpacing: '4px',
                  marginBottom: '16px'
                }}>
                  {t.partners.title}
                </h2>
                <p style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  letterSpacing: '1px',
                  maxWidth: '600px',
                  margin: '0 auto 40px'
                }}>
                  {t.partners.subtitle}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: '16px',
                marginBottom: '64px'
              }}>
                {t.partners.benefits.map((benefit, i) => (
                  <div key={i} style={{
                    padding: '32px 20px',
                    border: '1px solid rgba(203,166,88,0.3)',
                    background: 'rgba(15,23,42,0.8)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#e2e8f0',
                      letterSpacing: '1px',
                      fontWeight: '500'
                    }}>{benefit}</p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => {
                    const msg = language === 'english' ? 'Partnership inquiry for EnjoyBaja.com' : 'Consulta de asociacion para EnjoyBaja.com';
                    window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  style={{
                    padding: '18px 48px',
                    background: '#cba658',
                    border: 'none',
                    color: '#0f172a',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '3px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#d4b366';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#cba658';
                  }}
                >
                  {t.partners.cta}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ==================== COLLECTION TAB ==================== */}
        {activeTab === "collection" && (
          <section>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '200',
                color: '#e2e8f0',
                letterSpacing: '4px',
                marginBottom: '16px'
              }}>
                {t.collection.title}
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#94a3b8',
                letterSpacing: '2px'
              }}>
                {t.collection.subtitle}
              </p>
            </div>

            <LuxuryGoods language={language} />
          </section>
        )}

        {/* ==================== ADVERTISE TAB (4.0) ==================== */}
        {activeTab === "advertise" && (
          <section style={{ margin: 0, padding: 0 }}>
            {/* COMPACT AD CARDS */}
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              marginTop: 0,
              paddingTop: 0
            }}>
              <SelfServiceAdPortal language={language} />
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer style={{
          marginTop: '120px',
          padding: '48px 20px',
          borderTop: '1px solid rgba(203,166,88,0.3)',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.5)'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#cba658',
            letterSpacing: '3px',
            marginBottom: '16px',
            fontStyle: 'italic'
          }}>
            "{t.slogan}"
          </p>
          <p style={{
            fontSize: '13px',
            color: '#ffffff',
            letterSpacing: '2px',
            fontWeight: '500'
          }}>
            info@enjoybaja.com | WhatsApp: +52 646 340 2686
          </p>
        </footer>
      </div>

      {/* NEW FEATURE: MODAL POPUP */}
      {selectedEstablishment && (
        <div 
          onClick={() => setSelectedEstablishment(null)} 
          style={{
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.95)', 
            zIndex: 10000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '40px',
            overflowY: 'auto'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              maxWidth: '1000px', 
              width: '100%', 
              background: '#1e293b', 
              border: '1px solid rgba(203,166,88,0.3)', 
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button 
              onClick={() => setSelectedEstablishment(null)} 
              style={{
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                background: 'rgba(203,213,225,0.2)', 
                border: 'none', 
                color: '#cbd5e1', 
                fontSize: '32px', 
                width: '50px', 
                height: '50px', 
                cursor: 'pointer', 
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &times;
            </button>

            <div style={{
              position: 'relative', 
              height: '400px',
              backgroundImage: `url(${selectedEstablishment.photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div style={{
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                background: 'linear-gradient(to top, rgba(30,41,59,1), transparent)', 
                padding: '60px 40px 30px'
              }}>
                {selectedEstablishment.michelin > 0 && (
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>
                    {'⭐'.repeat(selectedEstablishment.michelin)}
                  </div>
                )}
                <h2 style={{
                  fontSize: '42px', 
                  fontWeight: '300', 
                  color: '#f1f5f9', 
                  margin: '0 0 8px 0'
                }}>
                  {selectedEstablishment.name}
                </h2>
                <p style={{
                  fontSize: '13px', 
                  color: '#cba658', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase'
                }}>
                  {selectedEstablishment.category} • {selectedEstablishment.city}
                </p>
              </div>
            </div>

            <div style={{ padding: '40px' }}>
              <p style={{
                fontSize: '16px', 
                color: '#cbd5e1', 
                lineHeight: '1.8', 
                marginBottom: '30px'
              }}>
                {selectedEstablishment.description}
              </p>

              <div style={{
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                gap: '30px', 
                marginBottom: '30px'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '11px', 
                    color: '#cbd5e1', 
                    letterSpacing: '2px', 
                    marginBottom: '12px',
                    textTransform: 'uppercase'
                  }}>
                    {language === 'english' ? 'Contact Information' : 'Información de Contacto'}
                  </h4>
                  {selectedEstablishment.phone && (
                    <p style={{ fontSize: '14px', color: '#f1f5f9', marginBottom: '8px' }}>
                      {selectedEstablishment.phone}
                    </p>
                  )}
                  {selectedEstablishment.website && (
                    <a 
                      href={selectedEstablishment.website.startsWith('http') ? selectedEstablishment.website : `https://${selectedEstablishment.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: '#cba658', fontSize: '13px' }}
                    >
                      {selectedEstablishment.website}
                    </a>
                  )}
                  {selectedEstablishment.region && (
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                      {selectedEstablishment.region}
                    </p>
                  )}
                </div>
                <div>
                  <h4 style={{
                    fontSize: '11px', 
                    color: '#cbd5e1', 
                    letterSpacing: '2px', 
                    marginBottom: '12px',
                    textTransform: 'uppercase'
                  }}>
                    {language === 'english' ? 'Pricing' : 'Precios'}
                  </h4>
                  {selectedEstablishment.fee > 0 && (
                    <p style={{ fontSize: '22px', color: '#f1f5f9', fontWeight: '300' }}>
                      ${selectedEstablishment.fee} USD
                    </p>
                  )}
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                    {selectedEstablishment.price}
                  </p>
                  {selectedEstablishment.reservation && (
                    <p style={{ fontSize: '12px', color: '#cba658', marginTop: '12px' }}>
                      ⚠ {language === 'english' ? 'Reservation Required' : 'Reservación Requerida'}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {selectedEstablishment.website && (
                  <a 
                    href={selectedEstablishment.website.startsWith('http') ? selectedEstablishment.website : `https://${selectedEstablishment.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{
                      flex: 1, 
                      minWidth: '200px',
                      padding: '16px', 
                      background: 'linear-gradient(135deg, #cba658, #b8944d)', 
                      color: '#0f172a', 
                      border: 'none', 
                      fontSize: '12px', 
                      letterSpacing: '2px', 
                      fontWeight: '700', 
                      textAlign: 'center', 
                      textDecoration: 'none', 
                      cursor: 'pointer',
                      display: 'block',
                      textTransform: 'uppercase'
                    }}
                  >
                    {language === 'english' ? 'Visit Website' : 'Visitar Sitio Web'}
                  </a>
                )}
                <a 
                  href={`https://www.google.com/maps?q=${selectedEstablishment.lat},${selectedEstablishment.lng}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{
                    flex: 1,
                    minWidth: '200px', 
                    padding: '16px', 
                    background: 'linear-gradient(135deg, #cbd5e1, #94a3b0)', 
                    color: '#0f172a', 
                    border: 'none', 
                    fontSize: '12px', 
                    letterSpacing: '2px', 
                    fontWeight: '700', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    cursor: 'pointer',
                    display: 'block',
                    textTransform: 'uppercase'
                  }}
                >
                  {language === 'english' ? 'View on Map' : 'Ver en Mapa'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}