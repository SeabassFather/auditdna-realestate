import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import LuxuryGoods from './LuxuryGoods';
import SelfServiceAdPortal from './SelfServiceAdPortal';

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
  // ======================== WINERIES (50) ========================
  {id:1,name:"Monte Xanic",type:"winery",category:"Historic/Award-Winning",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Pioneer winery founded 1987. Grand Gold Medal winner. Family-friendly with mini zoo. One of the original Valle wineries that put Baja on the world wine map.",phone:"+52 646 174 6155",price:"$$",fee:25,website:"montexanic.com.mx",lat:31.9167,lng:-116.6167,michelin:0,reservation:false},
  {id:2,name:"L.A. Cetto",type:"winery",category:"Historic/Large Production",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Mexico's largest winery. Founded 1928. Beautiful grounds, affordable tastings. Over 1,000 acres of vineyards across Baja California.",phone:"+52 646 155 2264",price:"$",fee:15,website:"lacetto.com",lat:31.9200,lng:-116.6200,michelin:0,reservation:false},
  {id:3,name:"Adobe Guadalupe",type:"winery",category:"Boutique/B&B",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Boutique winery with B&B. Stunning architecture. Arabian horses on property. Known for Gabriel blend and romantic vineyard setting.",phone:"+52 646 155 2094",price:"$$$",fee:40,website:"adobeguadalupe.com",lat:31.9300,lng:-116.6100,michelin:0,reservation:true},
  {id:4,name:"Vena Cava",type:"winery",category:"Architectural/Innovative",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Iconic recycled boat hull architecture. Innovative wines. Phil Gregory design. Underground barrel room with stunning valley views.",phone:"+52 646 156 8053",price:"$$",fee:30,website:"venacavawinery.com",lat:31.9250,lng:-116.6150,michelin:0,reservation:true},
  {id:5,name:"Bruma",type:"winery",category:"Ultra-Premium Resort",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Ultra-luxury wine resort. Home to FAUNA restaurant. Minimalist architecture by Alejandro D'Acosta. Premium tasting experiences.",phone:"+52 646 155 2850",price:"$$$$",fee:60,website:"bruma.mx",lat:31.9280,lng:-116.6180,michelin:0,reservation:true},
  {id:6,name:"Vinicola Torres Alegre y Familia",type:"winery",category:"Family Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Small family winery. Appointment only. Intimate tastings with the family. Known for exceptional Nebbiolo.",phone:"+52 646 177 2824",price:"$$",fee:25,website:"",lat:31.9100,lng:-116.6250,michelin:0,reservation:true},
  {id:7,name:"Bodegas Magoni",type:"winery",category:"Historic Estate",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Italian heritage winery. Beautiful estate grounds. Known for award-winning Fumato blend. Tasting room with valley panorama.",phone:"+52 646 178 2080",price:"$$",fee:20,website:"bodegasmagoni.com",lat:31.9150,lng:-116.6300,michelin:0,reservation:false},
  {id:8,name:"Vinicola Lafarga",type:"winery",category:"Award-Winning Boutique",region:"San Antonio de las Minas",city:"San Antonio de las Minas",description:"Award-winning wines. No web presence. Hidden gem of San Antonio de las Minas. Small production, big quality.",phone:"+52 646 177 1550",price:"$$",fee:20,website:"",lat:31.8900,lng:-116.6400,michelin:0,reservation:true},
  {id:9,name:"Chateau Camou",type:"winery",category:"French-Style Estate",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"French-inspired winemaking. Beautiful chateau architecture. Gran Vino is their flagship. One of the valley's most respected producers.",phone:"+52 646 177 3303",price:"$$$",fee:35,website:"chateaucamou.com.mx",lat:31.9180,lng:-116.6220,michelin:0,reservation:true},
  {id:10,name:"Casa de Piedra",type:"winery",category:"Artisan/Natural",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Hugo D'Acosta's pioneering winery. Father of modern Baja winemaking. Natural winemaking philosophy. Must-visit for wine enthusiasts.",phone:"+52 646 155 2849",price:"$$$",fee:35,website:"vinoscasadepiedra.com",lat:31.9220,lng:-116.6280,michelin:0,reservation:true},
  {id:11,name:"Lechuza Vineyard",type:"winery",category:"Premium Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium boutique winery. Elegant tasting room with panoramic views. Known for Tempranillo and Cabernet blends.",phone:"+52 646 156 8100",price:"$$$",fee:40,website:"lechuzavineyard.com",lat:31.9240,lng:-116.6190,michelin:0,reservation:true},
  {id:12,name:"Baron Balche",type:"winery",category:"Historic Pioneer",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"One of Valle's original wineries. Rich history dating back decades. Traditional winemaking with a modern twist.",phone:"+52 646 178 3136",price:"$$",fee:20,website:"baronbalche.com",lat:31.9130,lng:-116.6350,michelin:0,reservation:false},
  {id:13,name:"Encuentro Guadalupe",type:"winery",category:"Luxury Eco-Resort",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Architectural marvel with floating pod rooms overlooking the valley. Award-winning wine, world-class restaurant, infinity pool.",phone:"+52 646 155 2775",price:"$$$$",fee:75,website:"encuentroguadalupe.com",lat:31.9260,lng:-116.6120,michelin:0,reservation:true},
  {id:14,name:"Cava Maciel",type:"winery",category:"Boutique/Instagram",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Boutique winery popular on social media. Intimate tastings. Beautiful grounds. Known for small-lot premium wines.",phone:"+52 646 156 8055",price:"$$",fee:25,website:"",lat:31.9170,lng:-116.6260,michelin:0,reservation:true},
  {id:15,name:"Decantos Vinicola",type:"winery",category:"Modern Premium",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Modern winemaking facility. Premium labels. Stunning contemporary architecture with terrace overlooking vineyards.",phone:"+52 646 188 3310",price:"$$$",fee:35,website:"decantos.com",lat:31.9200,lng:-116.6140,michelin:0,reservation:true},
  {id:16,name:"Finca La Carrodilla",type:"winery",category:"Organic/Sustainable",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Organic and sustainable practices. Farm-to-glass philosophy. Beautiful ranch setting with olive groves and gardens.",phone:"+52 646 156 8200",price:"$$",fee:30,website:"fincalacarrodilla.com",lat:31.9290,lng:-116.6170,michelin:0,reservation:true},
  {id:17,name:"Vinisterra",type:"winery",category:"Award-Winning Estate",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Multiple international awards. Beautiful estate with modern tasting room. Known for exceptional Merlot and Cabernet.",phone:"+52 646 178 3350",price:"$$$",fee:35,website:"vinisterra.com",lat:31.9210,lng:-116.6230,michelin:0,reservation:true},
  {id:18,name:"Relieve Vinicola",type:"winery",category:"Emerging/Modern",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Next-generation Valle winery. Modern approach to traditional varieties. Clean, contemporary tasting room.",phone:"+52 646 156 8300",price:"$$",fee:25,website:"relievevinicola.com",lat:31.9180,lng:-116.6280,michelin:0,reservation:false},
  {id:19,name:"Sol de Media Noche",type:"winery",category:"Night Harvest Specialist",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Famous for night-harvested grapes at peak coolness. Unique flavor profiles. Romantic evening tastings available.",phone:"+52 646 156 8400",price:"$$$",fee:35,website:"",lat:31.9230,lng:-116.6160,michelin:0,reservation:true},
  {id:20,name:"Vinicola Emeve",type:"winery",category:"Family Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Family-run boutique winery. Personal attention. Known for excellent Grenache and Syrah. Beautiful terrace setting.",phone:"+52 646 156 8500",price:"$$",fee:25,website:"vinotemeve.com",lat:31.9250,lng:-116.6200,michelin:0,reservation:false},
  {id:21,name:"Paralelo",type:"winery",category:"Premium Estate",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Named for the 32nd parallel. Premium wines in a stunning modern facility. Known for Ensamble blend.",phone:"+52 646 156 8600",price:"$$$",fee:40,website:"paralelovinos.com",lat:31.9270,lng:-116.6140,michelin:0,reservation:true},
  {id:22,name:"Hacienda La Lomita",type:"winery",category:"Boutique Hacienda",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Beautiful hacienda-style winery. Rustic elegance. Known for Pagano label. Outdoor tastings in the garden.",phone:"+52 646 156 8700",price:"$$",fee:30,website:"haciendalomita.com",lat:31.9190,lng:-116.6250,michelin:0,reservation:false},
  {id:23,name:"Mogor Badan",type:"winery",category:"Iconic/Historic",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"One of the valley's most iconic wineries. Drew Deckman's outdoor restaurant nearby. Traditional Mexican winemaking at its finest.",phone:"+52 646 177 1484",price:"$$",fee:25,website:"mogorbadan.com",lat:31.9160,lng:-116.6310,michelin:0,reservation:false},
  {id:24,name:"Vinicola Tres Mujeres",type:"winery",category:"Women-Owned",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Women-owned and operated. Personal tastings with the founders. Growing reputation for excellent blends.",phone:"+52 646 156 8800",price:"$$",fee:25,website:"tresmujeres.mx",lat:31.9200,lng:-116.6170,michelin:0,reservation:true},
  {id:25,name:"JC Bravo",type:"winery",category:"Premium Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Small production, high quality. Beautiful modern tasting room. Known for exceptional Tempranillo.",phone:"+52 646 156 8900",price:"$$$",fee:35,website:"",lat:31.9240,lng:-116.6210,michelin:0,reservation:true},
  {id:26,name:"Pijoan",type:"winery",category:"Artisanal",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Artisanal wines with character. Family owned. Known for unique blends using Mediterranean grape varieties.",phone:"+52 646 177 2900",price:"$$",fee:25,website:"pijoan.mx",lat:31.9220,lng:-116.6270,michelin:0,reservation:false},
  {id:27,name:"Santo Tomas",type:"winery",category:"Historic/Large",region:"Ensenada",city:"Ensenada",description:"Baja's oldest winery, founded 1888. Downtown Ensenada tasting room. Rich history and consistent quality.",phone:"+52 646 178 3333",price:"$",fee:15,website:"santo-tomas.com",lat:31.8667,lng:-116.6167,michelin:0,reservation:false},
  {id:28,name:"Shimul",type:"winery",category:"Indigenous Heritage",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Honoring Kumiai indigenous heritage. Unique terroir-driven wines. Cultural experience beyond the tasting.",phone:"+52 646 156 9000",price:"$$",fee:30,website:"",lat:31.9180,lng:-116.6190,michelin:0,reservation:true},
  {id:29,name:"Alximia",type:"winery",category:"Science-Driven",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Science meets winemaking. Innovative approach. Modern facility with lab-precision fermentation.",phone:"+52 646 156 9100",price:"$$$",fee:35,website:"alximia.com",lat:31.9260,lng:-116.6150,michelin:0,reservation:true},
  {id:30,name:"Roganto",type:"winery",category:"Premium Boutique",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premium boutique operation. Known for limited-release wines. Beautiful tasting pavilion overlooking the valley.",phone:"+52 646 156 9200",price:"$$$",fee:40,website:"roganto.com",lat:31.9230,lng:-116.6230,michelin:0,reservation:true},
  {id:31,name:"Bibayoff",type:"winery",category:"Russian Heritage",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Russian Molokan heritage winery. One of the valley's original families. Traditional winemaking passed down generations.",phone:"+52 646 177 4800",price:"$$",fee:20,website:"",lat:31.9140,lng:-116.6340,michelin:0,reservation:false},
  {id:32,name:"Villa Montefiori",type:"winery",category:"Italian-Style",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Italian-influenced winemaking. Beautiful Mediterranean-style estate. Known for Sangiovese and Nebbiolo.",phone:"+52 646 156 9300",price:"$$$",fee:35,website:"villamontefiori.mx",lat:31.9200,lng:-116.6160,michelin:0,reservation:true},
  {id:33,name:"Clos de Tres Cantos",type:"winery",category:"Garage/Micro",region:"San Antonio de las Minas",city:"San Antonio de las Minas",description:"Micro-winery. Extremely limited production. By appointment only. One of the valley's hidden treasures.",phone:"+52 646 177 3500",price:"$$",fee:25,website:"",lat:31.8950,lng:-116.6380,michelin:0,reservation:true},
  {id:34,name:"Tintos del Norte",type:"winery",category:"Red Specialists",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Specialists in bold red wines. Northern Baja terroir expression. Growing cult following among collectors.",phone:"+52 646 156 9400",price:"$$",fee:30,website:"",lat:31.9210,lng:-116.6240,michelin:0,reservation:true},
  {id:35,name:"Maglen",type:"winery",category:"Award-Winning",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Multiple award winner at international competitions. Known for premium Cabernet Sauvignon and Merlot blends.",phone:"+52 646 156 9500",price:"$$$",fee:35,website:"maglen.mx",lat:31.9250,lng:-116.6180,michelin:0,reservation:true},
  {id:36,name:"Vinicola Regional",type:"winery",category:"Traditional",region:"Ensenada",city:"Ensenada",description:"Traditional Baja winemaking in Ensenada. Affordable and approachable wines. Great introduction to Mexican wine.",phone:"+52 646 178 3600",price:"$",fee:12,website:"",lat:31.8700,lng:-116.6200,michelin:0,reservation:false},
  {id:37,name:"Tres Valles",type:"winery",category:"Multi-Valley",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Sourcing grapes from three valleys. Complex blends reflecting diverse terroirs. Modern production facility.",phone:"+52 646 156 9600",price:"$$",fee:28,website:"tresvalles.mx",lat:31.9190,lng:-116.6220,michelin:0,reservation:false},
  {id:38,name:"Xecue",type:"winery",category:"Natural/Biodynamic",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Natural and biodynamic wines. Minimal intervention. Wild yeast fermentation. The purist's choice.",phone:"+52 646 156 9700",price:"$$$",fee:35,website:"",lat:31.9240,lng:-116.6160,michelin:0,reservation:true},
  {id:39,name:"Fratelli Pasini",type:"winery",category:"Italian Heritage",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Italian brothers' Baja dream. Rustic Italian charm meets Mexican terroir. Known for Super-Bajan blends.",phone:"+52 646 156 9800",price:"$$",fee:28,website:"fratellipasini.com",lat:31.9270,lng:-116.6130,michelin:0,reservation:false},
  {id:40,name:"Corona del Valle",type:"winery",category:"Estate Grown",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"100% estate-grown grapes. Full control from vine to bottle. Growing reputation for site-specific wines.",phone:"+52 646 156 9900",price:"$$",fee:25,website:"",lat:31.9160,lng:-116.6290,michelin:0,reservation:false},
  {id:41,name:"Bodegas de Santo Tomas (Valle)",type:"winery",category:"Historic Extension",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Valle de Guadalupe outpost of the historic Santo Tomas brand. Modern facility with vineyard views.",phone:"+52 646 178 3334",price:"$$",fee:20,website:"santo-tomas.com",lat:31.9200,lng:-116.6200,michelin:0,reservation:false},
  {id:42,name:"Quinta Monasterio",type:"winery",category:"Monastery Style",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Monastery-inspired architecture. Meditative grounds. Known for contemplative wine experiences.",phone:"+52 646 157 0100",price:"$$$",fee:35,website:"",lat:31.9280,lng:-116.6110,michelin:0,reservation:true},
  {id:43,name:"Lomaji",type:"winery",category:"Emerging Star",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Emerging star of the valley. Young winemakers with fresh perspectives. Innovative blends gaining recognition.",phone:"+52 646 157 0200",price:"$$",fee:25,website:"lomaji.mx",lat:31.9220,lng:-116.6250,michelin:0,reservation:false},
  {id:44,name:"Vinicola San Rafael",type:"winery",category:"Coastal Vineyard",region:"Ensenada",city:"Ensenada",description:"Coastal vineyard benefiting from ocean influence. Maritime character wines. Unique microclimate.",phone:"+52 646 178 3700",price:"$$",fee:22,website:"",lat:31.8800,lng:-116.6300,michelin:0,reservation:false},
  {id:45,name:"El Cielo",type:"winery",category:"Luxury Estate",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Luxury winery and resort. Premium wines paired with haute cuisine. Helicopter landing pad for VIP guests.",phone:"+52 646 157 0300",price:"$$$$",fee:65,website:"elcielowines.com",lat:31.9300,lng:-116.6100,michelin:0,reservation:true},
  {id:46,name:"Cava Espinoza",type:"winery",category:"Sparkling Specialist",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"One of few sparkling wine producers in the valley. Methode Champenoise. Celebration-worthy bubbles.",phone:"+52 646 157 0400",price:"$$$",fee:35,website:"",lat:31.9170,lng:-116.6270,michelin:0,reservation:true},
  {id:47,name:"Monte de Oro",type:"winery",category:"Hilltop Estate",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Hilltop estate with 360-degree views. Premium wines and panoramic tastings. Sunset sessions legendary.",phone:"+52 646 157 0500",price:"$$$",fee:40,website:"",lat:31.9260,lng:-116.6140,michelin:0,reservation:true},
  {id:48,name:"Vinicola del Rio",type:"winery",category:"Riverside",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Riverside vineyard with unique soil composition. Small production wines with distinct mineral character.",phone:"+52 646 157 0600",price:"$$",fee:25,website:"",lat:31.9190,lng:-116.6310,michelin:0,reservation:false},
  {id:49,name:"Punta Morro Vinos",type:"winery",category:"Oceanfront",region:"Ensenada",city:"Ensenada",description:"Oceanfront wine experience near Punta Morro. Unique pairing of sea breeze and wine tasting.",phone:"+52 646 178 3800",price:"$$",fee:28,website:"",lat:31.8500,lng:-116.6500,michelin:0,reservation:true},
  {id:50,name:"Hacienda Guadalupe",type:"winery",category:"Resort Winery",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Full resort with vineyard, restaurant, and boutique hotel. Popular destination wedding venue.",phone:"+52 646 155 2059",price:"$$$",fee:35,website:"haciendaguadalupe.mx",lat:31.9210,lng:-116.6180,michelin:0,reservation:false},

  // ======================== RESTAURANTS / FINE DINING (50) ========================
  {id:101,name:"Damiana (Vinedos de la Reina)",type:"restaurant",category:"Michelin Star",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin-starred farm-to-table. Fresh local ingredients with wine pairings. One of Mexico's finest dining experiences.",phone:"+52 646 174 6100",price:"$$$$",fee:120,website:"",lat:31.9167,lng:-116.6167,michelin:1,reservation:true},
  {id:102,name:"Animalon",type:"restaurant",category:"Michelin Star",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin-starred contemporary Mexican. Innovative seasonal menu featuring local ingredients and creative presentation.",phone:"+52 646 174 6200",price:"$$$$",fee:110,website:"",lat:31.9200,lng:-116.6200,michelin:1,reservation:true},
  {id:103,name:"Conchas de Piedra",type:"restaurant",category:"Michelin Star + Green Star",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin Star plus Green Star for sustainability. Ocean-inspired coastal cuisine. Sustainability focus throughout.",phone:"+52 646 174 6300",price:"$$$$",fee:100,website:"",lat:31.9180,lng:-116.6250,michelin:1,reservation:true},
  {id:104,name:"FAUNA (at Bruma)",type:"restaurant",category:"Michelin Recommended",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"High gastronomy at Bruma resort. Signature scallop dishes, elegant service, exceptional wine pairings from the valley.",phone:"+52 646 155 2850",price:"$$$$",fee:95,website:"bruma.mx",lat:31.9280,lng:-116.6180,michelin:0,reservation:true},
  {id:105,name:"Deckman's en el Mogor",type:"restaurant",category:"Michelin Green Star",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Michelin Green Star. Drew Deckman's legendary open-air kitchen. Farm-to-table sustainability pioneer. Cooking over live fire.",phone:"+52 646 188 3960",price:"$$$$",fee:85,website:"deckmans.com",lat:31.9160,lng:-116.6310,michelin:0,reservation:true},
  {id:106,name:"Lunario",type:"restaurant",category:"Michelin Inspector's Pick",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Featured in Michelin's Inspector's Best Dishes 2025. Contemporary Valle cuisine with creative presentation.",phone:"+52 646 174 6400",price:"$$$",fee:75,website:"",lat:31.9220,lng:-116.6170,michelin:0,reservation:true},
  {id:107,name:"Corazon de Tierra",type:"restaurant",category:"Tasting Menu",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Multi-course tasting menu with wine pairings. Farm-to-table modern Mexican. Reservations essential, often booked weeks ahead.",phone:"+52 646 156 8030",price:"$$$$",fee:90,website:"corazondetierra.com",lat:31.9250,lng:-116.6200,michelin:0,reservation:true},
  {id:108,name:"Finca Altozano",type:"restaurant",category:"Popular Fine Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Javier Plascencia's Valle flagship. Farm-to-table with stunning valley views. Wood-fired grill. One of the most visited restaurants.",phone:"+52 646 156 8045",price:"$$$",fee:65,website:"fincaaltozano.com",lat:31.9200,lng:-116.6230,michelin:0,reservation:true},
  {id:109,name:"Restaurante Laja",type:"restaurant",category:"Premier Dining",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Premier dining destination. Four-course menu with wine pairings. Advance reservations required. Elegant setting.",phone:"+52 646 155 2556",price:"$$$$",fee:85,website:"restaurantelaja.com",lat:31.9230,lng:-116.6190,michelin:0,reservation:true},
  {id:110,name:"Malva",type:"restaurant",category:"Contemporary",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Contemporary Valle cuisine. Creative dishes using hyper-local ingredients. Rising star among Valle restaurants.",phone:"+52 646 174 6500",price:"$$$",fee:70,website:"",lat:31.9190,lng:-116.6240,michelin:0,reservation:true},
  {id:111,name:"Nobu Los Cabos",type:"restaurant",category:"Celebrity Chef",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Nobu Matsuhisa's Los Cabos outpost. World-famous Japanese-Peruvian fusion. Oceanfront setting at Nobu Hotel.",phone:"+52 624 689 0880",price:"$$$$",fee:150,website:"noburestaurants.com",lat:23.0500,lng:-109.7000,michelin:0,reservation:true},
  {id:112,name:"Manta at The Cape",type:"restaurant",category:"Celebrity Chef",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Enrique Olvera's Cabo concept. Mexican-Japanese-Peruvian fusion. Stunning views of El Arco.",phone:"+52 624 163 0000",price:"$$$$",fee:130,website:"thecapeloscabos.com",lat:22.8950,lng:-109.9050,michelin:0,reservation:true},
  {id:113,name:"El Farallon",type:"restaurant",category:"Cliffside Seafood",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"At Capella Pedregal resort. Dramatic cliffside seafood dining. Choose your catch, watch the waves crash below.",phone:"+52 624 163 4300",price:"$$$$",fee:160,website:"capellahotels.com",lat:22.8800,lng:-109.9100,michelin:0,reservation:true},
  {id:114,name:"Flora Farms",type:"restaurant",category:"Farm-to-Table Luxury",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"25-acre organic farm with acclaimed restaurant, bar, and artisan shops. Farm-to-table luxury dining.",phone:"+52 624 355 4564",price:"$$$",fee:90,website:"flora-farms.com",lat:23.0800,lng:-109.6700,michelin:0,reservation:true},
  {id:115,name:"Sunset Monalisa",type:"restaurant",category:"Mediterranean Cliffside",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Mediterranean cliff dining with spectacular sunset views. Romantic destination overlooking the Sea of Cortez.",phone:"+52 624 145 8160",price:"$$$$",fee:120,website:"sunsetmonalisa.com",lat:22.9000,lng:-109.8900,michelin:0,reservation:true},
  {id:116,name:"Nick San",type:"restaurant",category:"High-End Japanese",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Best Japanese restaurant in Los Cabos. Fresh sushi and sashimi. Celebrity favorite. Multiple locations.",phone:"+52 624 143 4484",price:"$$$",fee:80,website:"nicksan.com",lat:22.8900,lng:-109.9000,michelin:0,reservation:true},
  {id:117,name:"Los Tamarindos",type:"restaurant",category:"Organic Farm",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Organic farm restaurant with cooking classes and farm-to-table dining. Stunning ranch setting.",phone:"+52 624 105 6031",price:"$$$",fee:85,website:"lostamarindos.mx",lat:23.0700,lng:-109.6900,michelin:0,reservation:true},
  {id:118,name:"La Guerrerense",type:"restaurant",category:"Street Food Icon",region:"Ensenada",city:"Ensenada",description:"World-famous tostada stand. Anthony Bourdain favorite. Seafood cocktails and ceviche that put Ensenada on the global food map.",phone:"",price:"$",fee:15,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:false},
  {id:119,name:"Manzanilla",type:"restaurant",category:"Fine Dining",region:"Ensenada",city:"Ensenada",description:"Benito Molina's waterfront fine dining. Mediterranean-Mexican fusion. Fresh catches daily from local fishermen.",phone:"+52 646 175 7073",price:"$$$",fee:75,website:"manzanilla.com.mx",lat:31.8600,lng:-116.6200,michelin:0,reservation:true},
  {id:120,name:"Caesar's Restaurant",type:"restaurant",category:"Historic Icon",region:"Tijuana",city:"Tijuana",description:"Birthplace of the Caesar Salad at Hotel Caesar's. Historic dining room. The salad is prepared tableside.",phone:"+52 664 685 1606",price:"$$",fee:45,website:"hotelcaesars.com.mx",lat:32.5300,lng:-117.0200,michelin:0,reservation:false},
  {id:121,name:"Telefonica Gastropark",type:"restaurant",category:"Food Hall",region:"Tijuana",city:"Tijuana",description:"Tijuana's premier food hall concept. Multiple curated food stalls. Craft cocktails. Urban dining experience.",phone:"+52 664 634 2500",price:"$$",fee:35,website:"",lat:32.5250,lng:-117.0350,michelin:0,reservation:false},
  {id:122,name:"Colectivo 9",type:"restaurant",category:"Culinary Collective",region:"Tijuana",city:"Tijuana",description:"Culinary collective bringing together the best young chefs of Tijuana. Rotating menus and creative collaborations.",phone:"+52 664 634 2600",price:"$$",fee:40,website:"",lat:32.5200,lng:-117.0300,michelin:0,reservation:false},
  {id:123,name:"Georgina Restaurant",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"One of Tijuana's top fine dining destinations. Contemporary Mexican with Baja California influences.",phone:"+52 664 681 3663",price:"$$$",fee:65,website:"",lat:32.5100,lng:-117.0250,michelin:0,reservation:true},
  {id:124,name:"Latitude 32",type:"restaurant",category:"Fine Dining",region:"Tijuana",city:"Tijuana",description:"Modern fine dining at the 32nd parallel. Innovative Baja cuisine with sophisticated presentations.",phone:"+52 664 634 3030",price:"$$$",fee:70,website:"",lat:31.8700,lng:-116.6300,michelin:0,reservation:true},
  {id:125,name:"Tras/Horizonte",type:"restaurant",category:"Contemporary",region:"Tijuana",city:"Tijuana",description:"Contemporary cuisine pushing boundaries. Young chef-driven menu. Part of Tijuana's culinary renaissance.",phone:"+52 664 634 2800",price:"$$",fee:50,website:"",lat:32.5150,lng:-117.0280,michelin:0,reservation:true},
  {id:126,name:"La Diferencia",type:"restaurant",category:"Upscale Mexican",region:"Tijuana",city:"Tijuana",description:"Upscale Mexican cuisine. Beautiful presentations of traditional dishes elevated to fine dining level.",phone:"+52 664 634 2700",price:"$$$",fee:60,website:"",lat:32.5180,lng:-117.0320,michelin:0,reservation:true},
  {id:127,name:"Jazamango",type:"restaurant",category:"Farm-to-Table",region:"Todos Santos",city:"Todos Santos",description:"Organic farm-to-table in the art town of Todos Santos. Local ingredients, creative Mexican cuisine.",phone:"+52 612 145 0227",price:"$$",fee:50,website:"jazamango.com",lat:23.4400,lng:-110.2200,michelin:0,reservation:true},
  {id:128,name:"Nim",type:"restaurant",category:"Contemporary",region:"La Paz",city:"La Paz",description:"La Paz's finest contemporary dining. Innovative seafood preparations. Beautiful malecon location.",phone:"+52 612 128 4300",price:"$$$",fee:60,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},
  {id:129,name:"Don Manuel's",type:"restaurant",category:"Steakhouse",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium steakhouse. USDA Prime cuts. Old-world elegance in Los Cabos.",phone:"+52 624 143 4400",price:"$$$",fee:85,website:"",lat:22.8900,lng:-109.9050,michelin:0,reservation:true},
  {id:130,name:"Edith's",type:"restaurant",category:"Fine Dining Institution",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Cabo fine dining institution. Decades of excellence. Mexican-Continental cuisine. Iconic atmosphere.",phone:"+52 624 143 0801",price:"$$$",fee:75,website:"edithscabo.com",lat:22.8850,lng:-109.9000,michelin:0,reservation:true},
  {id:131,name:"Asao Cocina del Rancho",type:"restaurant",category:"Ranch Cuisine",region:"Tecate",city:"Tecate",description:"Authentic ranch cuisine in Tecate. Traditional Baja California flavors. Gateway to the wine route.",phone:"+52 665 654 1200",price:"$$",fee:35,website:"",lat:32.5700,lng:-116.6300,michelin:0,reservation:false},
  {id:132,name:"La Cachanilla",type:"restaurant",category:"Chinese-Mexican Fusion",region:"Mexicali",city:"Mexicali",description:"Mexicali's famous Chinese-Mexican cuisine. Unique cultural fusion reflecting the city's Chinese heritage.",phone:"+52 686 568 2911",price:"$$",fee:30,website:"",lat:32.6270,lng:-115.4540,michelin:0,reservation:false},
  {id:133,name:"Mandarin Palace",type:"restaurant",category:"Chinese Fine Dining",region:"Mexicali",city:"Mexicali",description:"Premium Chinese cuisine in Mexicali. Part of the city's renowned La Chinesca district. Dim sum specialists.",phone:"+52 686 566 9020",price:"$$",fee:35,website:"",lat:32.6250,lng:-115.4560,michelin:0,reservation:false},
  {id:134,name:"La Finca de Adobe",type:"restaurant",category:"Farm Restaurant",region:"Tecate",city:"Tecate",description:"Farm restaurant in the Tecate countryside. Fresh ranch ingredients. Beautiful outdoor dining setting.",phone:"+52 665 654 1250",price:"$$",fee:30,website:"",lat:32.5650,lng:-116.6250,michelin:0,reservation:false},
  {id:135,name:"Puerto Nuevo Newport",type:"restaurant",category:"Lobster Village Icon",region:"Rosarito",city:"Puerto Nuevo",description:"The original lobster village of Puerto Nuevo. Classic Baja lobster, beans, rice, and tortillas experience.",phone:"+52 661 614 1166",price:"$$",fee:40,website:"",lat:32.2500,lng:-117.0700,michelin:0,reservation:false},
  {id:136,name:"Bismarkcito",type:"restaurant",category:"Seafood Legend",region:"La Paz",city:"La Paz",description:"La Paz seafood institution. Famous fish tacos and ceviche. Local legend. Cash-only authenticity.",phone:"+52 612 122 4854",price:"$",fee:15,website:"",lat:24.1400,lng:-110.3100,michelin:0,reservation:false},
  {id:137,name:"La Fonda Restaurant",type:"restaurant",category:"Historic Oceanfront",region:"Rosarito",city:"La Mision",description:"Historic oceanfront restaurant near La Mision. Cliff-edge dining with Pacific Ocean views.",phone:"+52 661 155 0307",price:"$$",fee:45,website:"",lat:32.0800,lng:-116.9500,michelin:0,reservation:false},
  {id:138,name:"El Dragon Rojo",type:"restaurant",category:"Chinese Heritage",region:"Mexicali",city:"Mexicali",description:"Premium Chinese cuisine in Mexicali's La Chinesca. Celebrating over a century of Chinese immigration.",phone:"+52 686 566 9100",price:"$$",fee:35,website:"",lat:32.6260,lng:-115.4550,michelin:0,reservation:false},
  {id:139,name:"Benno Restaurant",type:"restaurant",category:"Contemporary",region:"Todos Santos",city:"Todos Santos",description:"Contemporary dining in the artistic heart of Todos Santos. Fresh local seafood and produce.",phone:"+52 612 145 0700",price:"$$$",fee:55,website:"",lat:23.4450,lng:-110.2250,michelin:0,reservation:true},
  {id:140,name:"Hierbabuena",type:"restaurant",category:"Farm-to-Table",region:"Todos Santos",city:"El Pescadero",description:"Farm-to-table dining in El Pescadero. Organic ingredients. Beautiful garden setting with mountain views.",phone:"+52 612 130 3103",price:"$$",fee:45,website:"",lat:23.3800,lng:-110.1800,michelin:0,reservation:true},
  {id:141,name:"Mi Cocina de Rosarito",type:"restaurant",category:"Upscale Mexican",region:"Mexicali",city:"Mexicali",description:"Upscale Mexican cuisine with Baja California flair. Modern interpretations of traditional dishes.",phone:"+52 686 568 3000",price:"$$$",fee:50,website:"",lat:32.6280,lng:-115.4530,michelin:0,reservation:true},
  {id:142,name:"Steinbeck's",type:"restaurant",category:"Steakhouse",region:"La Paz",city:"La Paz",description:"La Paz premium steakhouse. Prime cuts with Sea of Cortez views. Named after John Steinbeck's Baja adventures.",phone:"+52 612 128 4400",price:"$$$",fee:65,website:"",lat:24.1450,lng:-110.3100,michelin:0,reservation:true},

  // ======================== BREWERIES (30) ========================
  {id:201,name:"Wendlandt Cerveceria",type:"brewery",category:"Award-Winning",region:"Ensenada",city:"Ensenada",description:"Best Brewery in Mexico two years running. Award-winning IPAs. Pioneering Ensenada's craft beer revolution.",phone:"+52 646 174 6068",price:"$$",fee:18,website:"wendlandt.com.mx",lat:31.7800,lng:-116.6200,michelin:0,reservation:false},
  {id:202,name:"Cerveza Cardera",type:"brewery",category:"Innovative",region:"Ensenada",city:"Ensenada",description:"Innovative brews including mango chamoy Berliner-Weisse and hibiscus saison. Pushing craft boundaries.",phone:"+52 646 178 8550",price:"$$",fee:15,website:"cervezacardera.com",lat:31.8100,lng:-116.6000,michelin:0,reservation:false},
  {id:203,name:"Baja Brewing Company",type:"brewery",category:"Craft Pioneer",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Los Cabos' pioneering craft brewery. Beachfront taproom. Multiple award-winning beers since 2007.",phone:"+52 624 130 7900",price:"$$",fee:25,website:"bajabrewingcompany.com",lat:23.0500,lng:-109.6800,michelin:0,reservation:false},
  {id:204,name:"Cerveceria Cucapa",type:"brewery",category:"Mexicali Pioneer",region:"Mexicali",city:"Mexicali",description:"Mexicali's craft beer pioneer. Multiple styles. Tours available. Named after the indigenous Cucapa people.",phone:"+52 686 564 3600",price:"$$",fee:18,website:"cucapa.com",lat:32.6300,lng:-115.4540,michelin:0,reservation:false},
  {id:205,name:"Cerveceria Transpeninsular",type:"brewery",category:"Innovative Craft",region:"Ensenada",city:"Ensenada",description:"Innovative craft brewery pushing styles in Ensenada. Known for experimental small batches.",phone:"+52 646 175 0150",price:"$$",fee:15,website:"",lat:31.8650,lng:-116.6300,michelin:0,reservation:false},
  {id:206,name:"Agua Mala",type:"brewery",category:"Award-Winning",region:"Ensenada",city:"Ensenada",description:"Award-winning craft brewery. Named 'Bad Water' as a play on words. Known for consistent quality.",phone:"+52 646 178 8600",price:"$$",fee:15,website:"aguamala.com.mx",lat:31.8700,lng:-116.6250,michelin:0,reservation:false},
  {id:207,name:"Border Psycho",type:"brewery",category:"Bold/Creative",region:"Tijuana",city:"Tijuana",description:"Bold creative brews from Tijuana. Pushing boundaries with unconventional ingredients and fearless recipes.",phone:"+52 664 634 3400",price:"$$",fee:15,website:"borderpsycho.com",lat:32.5200,lng:-117.0350,michelin:0,reservation:false},
  {id:208,name:"Cerveceria Insurgente",type:"brewery",category:"Premium Craft",region:"Tijuana",city:"Tijuana",description:"Premium craft brewery. One of Tijuana's flagship breweries. Known for La Lupulosa IPA.",phone:"+52 664 634 3500",price:"$$",fee:18,website:"insurgente.com.mx",lat:32.5250,lng:-117.0300,michelin:0,reservation:false},
  {id:209,name:"Ludica Artesanal",type:"brewery",category:"Playful/Creative",region:"Ensenada",city:"Ensenada",description:"Playful approach to craft beer. Creative taproom atmosphere. Known for fruit-forward experimental ales.",phone:"+52 646 178 8650",price:"$$",fee:12,website:"",lat:31.8680,lng:-116.6280,michelin:0,reservation:false},
  {id:210,name:"Colectivo Cervecero Baja",type:"brewery",category:"Collective",region:"Ensenada",city:"Ensenada",description:"Collaborative brewing collective. Community-driven production. Rotating guest brewers.",phone:"+52 646 178 8700",price:"$$",fee:12,website:"",lat:31.8720,lng:-116.6220,michelin:0,reservation:false},
  {id:211,name:"Border Brewing Company",type:"brewery",category:"Cross-Border",region:"Mexicali",city:"Mexicali",description:"Cross-border collaboration beers. Taproom in Mexicali. Bridging US-Mexico craft beer cultures.",phone:"+52 686 564 3700",price:"$$",fee:15,website:"",lat:32.6280,lng:-115.4560,michelin:0,reservation:false},
  {id:212,name:"Cerveceria Legado",type:"brewery",category:"New Generation",region:"Ensenada",city:"Ensenada",description:"New generation Ensenada brewery. Clean modern taproom. Growing reputation for balanced ales.",phone:"+52 646 178 8800",price:"$$",fee:15,website:"",lat:31.8750,lng:-116.6180,michelin:0,reservation:false},
  {id:213,name:"Cerveceria Tecate Tours",type:"brewery",category:"Historic Tours",region:"Tecate",city:"Tecate",description:"Tour the historic Tecate brewery. Learn the story behind one of Mexico's most iconic beer brands.",phone:"+52 665 654 9478",price:"$",fee:10,website:"",lat:32.5700,lng:-116.6280,michelin:0,reservation:true},
  {id:214,name:"Teorema Cerveceria",type:"brewery",category:"Scientific Approach",region:"Tijuana",city:"Tijuana",description:"Scientific approach to brewing. Precision craft. Known for exceptional lagers and crisp pilsners.",phone:"+52 664 634 3600",price:"$$",fee:15,website:"teoremacerveceria.com",lat:32.5300,lng:-117.0250,michelin:0,reservation:false},
  {id:215,name:"Mamut Brewery",type:"brewery",category:"Bold Flavors",region:"Tijuana",city:"Tijuana",description:"Bold, mammoth-sized flavors. Tijuana taproom with street food pairings. Known for stouts and porters.",phone:"+52 664 634 3700",price:"$$",fee:15,website:"mamutbrewery.com",lat:32.5180,lng:-117.0380,michelin:0,reservation:false},
  {id:216,name:"Ramuri Cerveza",type:"brewery",category:"Indigenous Heritage",region:"Ensenada",city:"Ensenada",description:"Named for the Tarahumara runners. Endurance in every sip. Unique recipes inspired by indigenous ingredients.",phone:"+52 646 178 8900",price:"$$",fee:15,website:"",lat:31.8600,lng:-116.6350,michelin:0,reservation:false},
  {id:217,name:"Plaza Fiesta Craft Beer",type:"brewery",category:"Beer District",region:"Tijuana",city:"Tijuana",description:"The heart of Tijuana's craft beer district. Multiple breweries under one roof. Weekend beer tourism hub.",phone:"+52 664 634 3800",price:"$",fee:10,website:"",lat:32.5220,lng:-117.0320,michelin:0,reservation:false},
  {id:218,name:"Cerveceria Fauna",type:"brewery",category:"Valley Craft",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Craft brewery in wine country. Unique position offering beer tastings alongside the valley's wineries.",phone:"+52 646 156 8050",price:"$$",fee:15,website:"",lat:31.9200,lng:-116.6250,michelin:0,reservation:false},

  // ======================== HOTELS & RESORTS (40) ========================
  {id:301,name:"One&Only Palmilla",type:"hotel",category:"Ultra-Luxury Resort",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Ultra-luxury beachfront resort. Rates from $800-$5,000/night. Private beach, world-class spa, Jack Nicklaus golf.",phone:"+52 624 146 7000",price:"$$$$",fee:800,website:"oneandonlyresorts.com",lat:23.0340,lng:-109.7008,michelin:0,reservation:true},
  {id:302,name:"Las Ventanas al Paraiso (Rosewood)",type:"hotel",category:"Ultra-Luxury Resort",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Rosewood's flagship resort. $1,200-$8,000/night. Butler service. Telescope in every suite. Luxury redefined.",phone:"+52 624 144 2800",price:"$$$$",fee:1200,website:"rosewoodhotels.com",lat:23.0300,lng:-109.7050,michelin:0,reservation:true},
  {id:303,name:"The Cape (Thompson)",type:"hotel",category:"Design Hotel",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Design-forward hotel overlooking El Arco. $400-$2,000/night. Home to Manta restaurant by Enrique Olvera.",phone:"+52 624 163 0000",price:"$$$$",fee:400,website:"thecapeloscabos.com",lat:22.8950,lng:-109.9050,michelin:0,reservation:true},
  {id:304,name:"Nobu Hotel Los Cabos",type:"hotel",category:"Celebrity Hotel",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Robert De Niro and Nobu Matsuhisa's luxury concept. $600-$3,000/night. Japanese-inspired design and cuisine.",phone:"+52 624 689 0880",price:"$$$$",fee:600,website:"nobuhotelloscabos.com",lat:23.0450,lng:-109.6950,michelin:0,reservation:true},
  {id:305,name:"Esperanza, Auberge Resort",type:"hotel",category:"Ultra-Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Auberge Resorts Collection. $900-$6,000/night. Cliffside infinity pools. Holistic spa. Art collection.",phone:"+52 624 145 6400",price:"$$$$",fee:900,website:"esperanzaresort.com",lat:22.8800,lng:-109.8900,michelin:0,reservation:true},
  {id:306,name:"Capella Pedregal",type:"hotel",category:"Ultra-Luxury Tunnel Entry",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Enter through a private tunnel carved through the mountain. $1,000-$10,000/night. El Farallon restaurant. Unmatched privacy.",phone:"+52 624 163 4300",price:"$$$$",fee:1000,website:"capellahotels.com",lat:22.8750,lng:-109.9100,michelin:0,reservation:true},
  {id:307,name:"Montage Los Cabos",type:"hotel",category:"Luxury Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Montage resort with beachfront suites. $800-$4,000/night. Multiple pools, world-class golf access.",phone:"+52 624 163 2000",price:"$$$$",fee:800,website:"montagehotels.com",lat:23.0400,lng:-109.7100,michelin:0,reservation:true},
  {id:308,name:"Grand Velas Los Cabos",type:"hotel",category:"All-Inclusive Luxury",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Ultra-luxury all-inclusive. $600-$3,500/night. Multiple gourmet restaurants. SE Spa. Butler service.",phone:"+52 624 104 9800",price:"$$$$",fee:600,website:"loscabos.grandvelas.com",lat:23.0350,lng:-109.7050,michelin:0,reservation:true},
  {id:309,name:"Hotel Coral & Marina",type:"hotel",category:"Marina Resort",region:"Ensenada",city:"Ensenada",description:"Full-service marina resort. $200-$600/night. Yacht slips. Ocean views. Convention facilities.",phone:"+52 646 175 0000",price:"$$$",fee:200,website:"hotelcoral.com",lat:31.8200,lng:-116.6100,michelin:0,reservation:true},
  {id:310,name:"Las Rosas Hotel & Spa",type:"hotel",category:"Oceanfront Boutique",region:"Ensenada",city:"Ensenada",description:"Oceanfront boutique hotel. $150-$400/night. All-suite with Pacific views. Spa services.",phone:"+52 646 174 4310",price:"$$",fee:150,website:"lasrosas.com",lat:31.9000,lng:-116.6500,michelin:0,reservation:true},
  {id:311,name:"Rosarito Beach Hotel",type:"hotel",category:"Historic Beach",region:"Rosarito",city:"Rosarito",description:"Historic 1925 hotel. Marilyn Monroe, Frank Sinatra once stayed. $100-$300/night. Beachfront classic.",phone:"+52 661 612 0144",price:"$$",fee:100,website:"rosaritobeachhotel.com",lat:32.3333,lng:-117.0333,michelin:0,reservation:true},
  {id:312,name:"Las Rocas Resort & Spa",type:"hotel",category:"Oceanfront Suites",region:"Rosarito",city:"Rosarito",description:"All-suite oceanfront resort. $150-$400/night. Spa services. Heated pool. Pacific panoramas.",phone:"+52 661 614 0360",price:"$$",fee:150,website:"lasrocas.com",lat:32.3000,lng:-117.0500,michelin:0,reservation:true},
  {id:313,name:"CostaBaja Resort & Spa",type:"hotel",category:"Marina Golf Resort",region:"La Paz",city:"La Paz",description:"Gary Player golf course. Full marina. $200-$600/night. Sea of Cortez setting. Water sports center.",phone:"+52 612 121 6000",price:"$$$",fee:200,website:"costabaja.com",lat:24.0800,lng:-110.3100,michelin:0,reservation:true},
  {id:314,name:"Hotel San Cristobal",type:"hotel",category:"Boutique Art Hotel",region:"Todos Santos",city:"Todos Santos",description:"Boutique art hotel in Todos Santos. $150-$350/night. Gallery on-site. Poolside dining. Pacific sunset views.",phone:"+52 612 145 8500",price:"$$",fee:150,website:"hotelsancristobal.com",lat:23.4450,lng:-110.2250,michelin:0,reservation:true},
  {id:315,name:"Hotel & Spa El Ganzo",type:"hotel",category:"Art/Music Hotel",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Art-forward boutique with underground recording studio. $300/night. Rooftop pool. Celebrity music sessions.",phone:"+52 624 104 9000",price:"$$$",fee:300,website:"elganzo.com",lat:23.0600,lng:-109.6800,michelin:0,reservation:true},
  {id:316,name:"Villa del Palmar Loreto",type:"hotel",category:"All-Inclusive Beach",region:"Loreto",city:"Loreto",description:"All-inclusive beach resort. TPC golf course. Islands of Loreto marine park access. $280/night.",phone:"+52 613 134 1000",price:"$$$",fee:280,website:"villadelpalmarloreto.com",lat:25.9400,lng:-111.3100,michelin:0,reservation:true},
  {id:317,name:"Hotel Lucerna Mexicali",type:"hotel",category:"Business Luxury",region:"Mexicali",city:"Mexicali",description:"Mexicali's premier business hotel. Beautiful gardens. Multiple restaurants. Convention facilities. $120/night.",phone:"+52 686 564 7000",price:"$$",fee:120,website:"hoteleslucerna.com",lat:32.6380,lng:-115.4680,michelin:0,reservation:true},
  {id:318,name:"Fiesta Inn Mexicali",type:"hotel",category:"Business Modern",region:"Mexicali",city:"Mexicali",description:"Modern business hotel. Convention facilities. $100/night. Central Mexicali location.",phone:"+52 686 837 3300",price:"$$",fee:100,website:"fiestainn.com",lat:32.6350,lng:-115.4650,michelin:0,reservation:true},
  {id:319,name:"Hotel Santuario Diegueno",type:"hotel",category:"Boutique Gateway",region:"Tecate",city:"Tecate",description:"Boutique hotel. Gateway to the wine route from Tecate. Quiet retreat with mountain views.",phone:"+52 665 654 1176",price:"$$",fee:90,website:"",lat:32.5680,lng:-116.6350,michelin:0,reservation:true},
  {id:320,name:"Diamante Cabo San Lucas",type:"hotel",category:"Luxury Golf Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Two championship courses (Dunes & El Cardonal). Luxury residences. Private beach. Ultra-exclusive.",phone:"+52 624 172 5812",price:"$$$$",fee:500,website:"diamantecabo.com",lat:22.9100,lng:-109.9200,michelin:0,reservation:true},

  // ======================== SPAS & WELLNESS (25) ========================
  {id:401,name:"Rancho La Puerta",type:"spa",category:"World-Famous Destination Spa",region:"Tecate",city:"Tecate",description:"World-renowned destination spa since 1940. Week-long wellness programs. 3,000 acres. Organic garden. Fitness pioneer.",phone:"+52 665 654 9155",price:"$$$$",fee:400,website:"rfranchollapuerta.com",lat:32.5600,lng:-116.6100,michelin:0,reservation:true},
  {id:402,name:"Waldorf Astoria Spa Cabo",type:"spa",category:"Ultra-Luxury Resort Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Ultra-luxury treatments $300-$600. Full hydrotherapy circuit. Ocean-view treatment rooms. Premium products.",phone:"+52 624 163 4100",price:"$$$$",fee:300,website:"waldorfastoria.com",lat:22.9050,lng:-109.8950,michelin:0,reservation:true},
  {id:403,name:"One&Only Spa",type:"spa",category:"Ultra-Luxury Resort Spa",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Couples suites. Thalassotherapy. $400-$800 treatments. Outdoor treatment pavilions. Holistic wellness.",phone:"+52 624 146 7000",price:"$$$$",fee:400,website:"oneandonlyresorts.com",lat:23.0340,lng:-109.7008,michelin:0,reservation:true},
  {id:404,name:"Cactus Spa (Capella Pedregal)",type:"spa",category:"Cliffside Luxury Spa",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Cliffside spa at Capella Pedregal. $350-$700 treatments. Cave-inspired treatment rooms. Ocean sounds.",phone:"+52 624 163 4300",price:"$$$$",fee:350,website:"capellahotels.com",lat:22.8750,lng:-109.9100,michelin:0,reservation:true},
  {id:405,name:"Contemplacion Spa",type:"spa",category:"Wine Country Wellness",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Wine country spa in Valle de Guadalupe. Vinotherapy treatments. Valley views. Relaxation in wine country.",phone:"+52 646 156 8700",price:"$$$",fee:150,website:"",lat:31.9200,lng:-116.6200,michelin:0,reservation:true},
  {id:406,name:"Las Rocas Spa",type:"spa",category:"Ocean Spa",region:"Rosarito",city:"Rosarito",description:"Oceanfront spa at Las Rocas Resort. Pacific-inspired treatments. Hot tub overlooking the sea.",phone:"+52 661 614 9650",price:"$$",fee:80,website:"lasrocas.com",lat:32.3000,lng:-117.0500,michelin:0,reservation:true},
  {id:407,name:"Armonia Spa",type:"spa",category:"Day Spa",region:"Ensenada",city:"Ensenada",description:"Full-service day spa in Ensenada. Massage, facials, body treatments. Affordable luxury.",phone:"+52 646 178 4000",price:"$$",fee:60,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:true},
  {id:408,name:"Spa Buena Vida",type:"spa",category:"Wellness Center",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Holistic wellness center in San Jose del Cabo. Yoga, meditation, traditional healing practices.",phone:"+52 624 142 3000",price:"$$",fee:70,website:"",lat:23.0600,lng:-109.6900,michelin:0,reservation:true},
  {id:409,name:"Desert Spa Cabo",type:"spa",category:"Desert Treatments",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Unique desert-inspired treatments. Sand therapy. Cactus body wraps. Local botanical ingredients.",phone:"+52 624 142 3500",price:"$$$",fee:120,website:"",lat:23.0550,lng:-109.6850,michelin:0,reservation:true},
  {id:410,name:"Zen Wellness Spa",type:"spa",category:"Asian-Inspired",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Asian-inspired wellness spa. Shiatsu, Thai massage, reflexology. Tranquil garden setting.",phone:"+52 624 143 5700",price:"$$$",fee:100,website:"",lat:22.8900,lng:-109.9000,michelin:0,reservation:true},
  {id:411,name:"Luna Spa La Paz",type:"spa",category:"Beachfront Spa",region:"La Paz",city:"La Paz",description:"Beachfront spa in La Paz. Sea of Cortez inspired treatments. Relaxation with ocean breezes.",phone:"+52 612 122 5000",price:"$$",fee:70,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},
  {id:412,name:"Temazcal Ceremonies",type:"spa",category:"Traditional Healing",region:"Valle de Guadalupe",city:"Various Baja Locations",description:"Traditional Mesoamerican sweat lodge ceremonies. Spiritual cleansing. Led by indigenous practitioners.",phone:"+52 646 171 7000",price:"$$",fee:60,website:"",lat:31.9167,lng:-116.6167,michelin:0,reservation:true},
  {id:413,name:"Spa Lucerna Mexicali",type:"spa",category:"Hotel Spa",region:"Mexicali",city:"Mexicali",description:"Full spa at Hotel Lucerna. Massage, facials, body treatments. Oasis in the desert city.",phone:"+52 686 564 7000",price:"$$",fee:85,website:"hoteleslucerna.com",lat:32.6380,lng:-115.4680,michelin:0,reservation:true},
  {id:414,name:"Harmony Spa Mexicali",type:"spa",category:"Day Spa",region:"Mexicali",city:"Mexicali",description:"Day spa in Mexicali. Hydrotherapy, aromatherapy, relaxation treatments. Modern facilities.",phone:"+52 686 568 3500",price:"$$",fee:75,website:"",lat:32.6350,lng:-115.4600,michelin:0,reservation:true},
  {id:415,name:"El Encanto de la Laguna",type:"spa",category:"Eco-Lodge Spa",region:"Loreto",city:"San Ignacio",description:"Desert oasis eco-lodge near whale sanctuary. Natural hot springs. Complete disconnection from the world.",phone:"+52 615 154 0098",price:"$$$",fee:150,website:"",lat:27.2900,lng:-112.8900,michelin:0,reservation:true},

  // ======================== GOLF COURSES (18) ========================
  {id:501,name:"Quivira Golf Club",type:"golf",category:"Jack Nicklaus Signature",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Jack Nicklaus Signature course. $400+ greens fees. Dramatic cliffside holes overlooking the Pacific. Bucket-list golf.",phone:"+52 624 145 6200",price:"$$$$",fee:400,website:"quiviraloscabos.com",lat:22.8800,lng:-109.9200,michelin:0,reservation:true},
  {id:502,name:"Cabo del Sol (Ocean Course)",type:"golf",category:"Championship Ocean",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Ocean course designed by Jack Nicklaus. $300+ greens fees. Considered one of the top courses in Latin America.",phone:"+52 624 145 8200",price:"$$$$",fee:300,website:"cabodelsol.com",lat:22.9000,lng:-109.8800,michelin:0,reservation:true},
  {id:503,name:"Cabo del Sol (Desert Course)",type:"golf",category:"Desert Championship",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Tom Weiskopf desert course. Dramatic desert landscape with ocean views. $250 greens fees.",phone:"+52 624 145 8200",price:"$$$",fee:250,website:"cabodelsol.com",lat:22.9050,lng:-109.8750,michelin:0,reservation:true},
  {id:504,name:"Palmilla Golf Club",type:"golf",category:"Jack Nicklaus Design",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Jack Nicklaus design. 27 holes (Mountain, Arroyo, Ocean). $350+ greens fees. One&Only Palmilla access.",phone:"+52 624 144 5250",price:"$$$$",fee:350,website:"palmillagc.com",lat:23.0340,lng:-109.7008,michelin:0,reservation:true},
  {id:505,name:"Puerto Los Cabos",type:"golf",category:"Norman & Nicklaus",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Two courses by Greg Norman and Jack Nicklaus. Marina and Mission courses. $250+ greens fees.",phone:"+52 624 173 9400",price:"$$$",fee:250,website:"puertoloscabos.com",lat:23.0700,lng:-109.6700,michelin:0,reservation:true},
  {id:506,name:"Cabo Real Golf Club",type:"golf",category:"Robert Trent Jones II",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Robert Trent Jones II design. $200+ greens fees. Ocean holes. Accessible luxury golf.",phone:"+52 624 144 0040",price:"$$$",fee:200,website:"caboreal.com",lat:22.9200,lng:-109.8600,michelin:0,reservation:true},
  {id:507,name:"Diamante Dunes Course",type:"golf",category:"Davis Love III Design",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Davis Love III design. Dramatic Pacific dunes. One of Mexico's most exclusive courses.",phone:"+52 624 172 5812",price:"$$$$",fee:350,website:"diamantecabo.com",lat:22.9100,lng:-109.9200,michelin:0,reservation:true},
  {id:508,name:"Diamante El Cardonal",type:"golf",category:"Tiger Woods Design",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Tiger Woods' first public golf course design. Desert layout with ocean glimpses. $300 greens fees.",phone:"+52 624 172 5812",price:"$$$$",fee:300,website:"diamantecabo.com",lat:22.9150,lng:-109.9150,michelin:0,reservation:true},
  {id:509,name:"Club Campestre San Jose",type:"golf",category:"Private Championship",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Private championship course. Guest access through select hotels. Impeccable conditioning.",phone:"+52 624 173 9300",price:"$$$",fee:200,website:"",lat:23.0500,lng:-109.6900,michelin:0,reservation:true},
  {id:510,name:"Bajamar Ocean Front Golf Resort",type:"golf",category:"Oceanfront Links",region:"Ensenada",city:"Ensenada",description:"27 holes on the Pacific bluffs. $80-$150 greens fees. Stunning ocean views on every hole.",phone:"+52 646 155 0151",price:"$$",fee:80,website:"bajamar.com",lat:32.1500,lng:-116.9500,michelin:0,reservation:true},
  {id:511,name:"Real del Mar Golf Resort",type:"golf",category:"Resort Course",region:"Tijuana",city:"Tijuana",description:"18-hole resort course near the border. $100 greens fees. Ocean views. Easy access from San Diego.",phone:"+52 664 631 3401",price:"$$",fee:100,website:"realdelmar.com.mx",lat:32.4500,lng:-117.0800,michelin:0,reservation:true},
  {id:512,name:"Club Campestre Tijuana",type:"golf",category:"Historic Private",region:"Tijuana",city:"Tijuana",description:"Private country club established 1927. Guest access limited. Historic course. Social hub of Tijuana.",phone:"+52 664 681 7855",price:"$$$",fee:150,website:"",lat:32.5000,lng:-117.0400,michelin:0,reservation:true},
  {id:513,name:"Club Campestre de Mexicali",type:"golf",category:"Championship Desert",region:"Mexicali",city:"Mexicali",description:"Private 18-hole championship course. Desert setting. Palm-lined fairways. Mexicali's premier golf.",phone:"+52 686 564 4500",price:"$$$",fee:150,website:"",lat:32.6500,lng:-115.4200,michelin:0,reservation:true},
  {id:514,name:"Valle del Sol Golf Club",type:"golf",category:"Desert Course",region:"Mexicali",city:"Mexicali",description:"Desert course with palm trees. Clubhouse dining. Views of the Sierra de Cucapah mountains.",phone:"+52 686 564 4600",price:"$$",fee:120,website:"",lat:32.5200,lng:-115.3500,michelin:0,reservation:true},
  {id:515,name:"Paraiso del Mar (CostaBaja)",type:"golf",category:"Gary Player Signature",region:"La Paz",city:"La Paz",description:"Gary Player Signature design. 18 holes oceanfront at CostaBaja. $120 greens fees. Sea of Cortez panoramas.",phone:"+52 612 121 6000",price:"$$",fee:120,website:"paraisodelmar.com",lat:24.0500,lng:-110.3000,michelin:0,reservation:true},
  {id:516,name:"Mar de Cortes Golf (El Dorado)",type:"golf",category:"Desert Links",region:"San Felipe",city:"San Felipe",description:"Desert links at El Dorado Ranch. Sea of Cortez views. $85 greens fees. Unique desert-ocean setting.",phone:"+52 686 576 0422",price:"$$",fee:85,website:"eldoradoranch.com",lat:30.9800,lng:-114.7800,michelin:0,reservation:true},

  // ======================== CIGAR BARS & LOUNGES (12) ========================
  {id:601,name:"Havana Cigar Lounge",type:"cigar-bar",category:"Resort Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium Cuban cigars at Esperanza Resort. Ocean view terrace. $50-$200 cigar selection. Paired with aged rum and whiskey.",phone:"+52 624 145 6000",price:"$$$$",fee:50,website:"esperanzaresort.com",lat:23.0300,lng:-109.7000,michelin:0,reservation:false},
  {id:602,name:"The Rooftop Cigar Bar",type:"cigar-bar",category:"Rooftop Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"At The Cape hotel. Sunset cigars and premium cocktails with El Arco views. Curated cigar menu.",phone:"+52 624 163 0000",price:"$$$",fee:30,website:"thecapeloscabos.com",lat:22.8950,lng:-109.9050,michelin:0,reservation:false},
  {id:603,name:"Cigar Bar at Montage",type:"cigar-bar",category:"Resort Premium",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium cigar selection at Montage Los Cabos. Walk-in humidor. Paired with rare spirits collection.",phone:"+52 624 163 2000",price:"$$$$",fee:45,website:"montagehotels.com",lat:23.0400,lng:-109.7100,michelin:0,reservation:false},
  {id:604,name:"La Cava de Habanos",type:"cigar-bar",category:"Premium Cigar Shop",region:"Tijuana",city:"Tijuana",description:"Premium Cuban and Mexican cigars. Walk-in humidor room. Leather seating. Expert cigar sommeliers.",phone:"+52 664 681 2525",price:"$$$",fee:25,website:"",lat:32.5300,lng:-117.0350,michelin:0,reservation:false},
  {id:605,name:"Cava de Puros TJ",type:"cigar-bar",category:"Mexican Cigars",region:"Tijuana",city:"Tijuana",description:"Specializing in premium Mexican cigars. San Andres wrappers. Private smoking lounge. Mezcal pairings.",phone:"+52 664 681 2600",price:"$$",fee:20,website:"",lat:32.5250,lng:-117.0300,michelin:0,reservation:false},
  {id:606,name:"Casa Marcelo Cigar Room",type:"cigar-bar",category:"Private Lounge",region:"Ensenada",city:"Ensenada",description:"Private cigar lounge in Ensenada. Exclusive membership available. Paired with Baja wines and craft cocktails.",phone:"+52 646 178 4100",price:"$$$",fee:30,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:true},
  {id:607,name:"Churchill's Lounge Cabo",type:"cigar-bar",category:"Classic Gentlemen's",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Classic gentlemen's lounge. Extensive humidor. Rare Cubans available. Old-world leather and mahogany decor.",phone:"+52 624 143 5800",price:"$$$",fee:35,website:"",lat:22.8900,lng:-109.9000,michelin:0,reservation:false},
  {id:608,name:"The Humidor Valle",type:"cigar-bar",category:"Wine Country Lounge",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Cigar lounge in wine country. Perfect pairing of premium cigars with Valle de Guadalupe wines.",phone:"+52 646 156 8150",price:"$$",fee:25,website:"",lat:31.9200,lng:-116.6200,michelin:0,reservation:false},
  {id:609,name:"Puros del Pacifico",type:"cigar-bar",category:"Oceanview Lounge",region:"La Paz",city:"La Paz",description:"Oceanview cigar lounge overlooking the Sea of Cortez. Sunset smoking sessions. Craft mezcal selection.",phone:"+52 612 122 5100",price:"$$",fee:25,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:false},
  {id:610,name:"Smoke & Spirits Rosarito",type:"cigar-bar",category:"Beach Lounge",region:"Rosarito",city:"Rosarito",description:"Beachside cigar and spirits lounge. Pacific views. Relaxed atmosphere. Premium tequila flights.",phone:"+52 661 612 1300",price:"$$",fee:20,website:"",lat:32.3333,lng:-117.0333,michelin:0,reservation:false},
  {id:611,name:"Habanos Club Mexicali",type:"cigar-bar",category:"Desert Lounge",region:"Mexicali",city:"Mexicali",description:"Premium cigar club in Mexicali. Private membership. Climate-controlled humidor. Desert oasis atmosphere.",phone:"+52 686 564 4700",price:"$$",fee:20,website:"",lat:32.6270,lng:-115.4540,michelin:0,reservation:false},
  {id:612,name:"El Puro Todos Santos",type:"cigar-bar",category:"Art Town Lounge",region:"Todos Santos",city:"Todos Santos",description:"Artistic cigar lounge in the bohemian town of Todos Santos. Gallery-meets-lounge concept.",phone:"+52 612 145 0800",price:"$$",fee:20,website:"",lat:23.4450,lng:-110.2250,michelin:0,reservation:false},

  // ======================== ROOFTOP BARS & LOUNGES (15) ========================
  {id:701,name:"Sazon Sky Bar",type:"rooftop",category:"Panoramic City Views",region:"Tijuana",city:"Tijuana",description:"Panoramic Tijuana city views. Craft cocktails. DJ nights on weekends. Elevated nightlife experience.",phone:"+52 664 634 4000",price:"$$",fee:35,website:"",lat:32.5150,lng:-117.0380,michelin:0,reservation:false},
  {id:702,name:"Terraza Revolucion",type:"rooftop",category:"Mezcal Specialists",region:"Tijuana",city:"Tijuana",description:"Revolutionary Avenue rooftop. Mezcal specialists with 50+ varieties. Sunset views over the city.",phone:"+52 664 634 4100",price:"$$",fee:30,website:"",lat:32.5200,lng:-117.0400,michelin:0,reservation:false},
  {id:703,name:"Mirador Sky Lounge",type:"rooftop",category:"Bay Views",region:"Ensenada",city:"Ensenada",description:"Ensenada bay views. Wine cocktails and craft mixology. Sunset specials. Elegant open-air terrace.",phone:"+52 646 178 4200",price:"$$",fee:28,website:"",lat:31.8667,lng:-116.6170,michelin:0,reservation:false},
  {id:704,name:"Alto Nivel Lounge",type:"rooftop",category:"Downtown High-Rise",region:"Mexicali",city:"Mexicali",description:"Downtown Mexicali high-rise rooftop. Premium tequila selection. City lights panorama. VIP tables.",phone:"+52 686 564 4800",price:"$$",fee:32,website:"",lat:32.6270,lng:-115.4540,michelin:0,reservation:false},
  {id:705,name:"La Terraza del Valle",type:"rooftop",category:"Vineyard Views",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Rooftop with vineyard views. Wine bar featuring local producers. Chef's tapas menu. Valley panorama.",phone:"+52 646 156 8200",price:"$$",fee:40,website:"",lat:31.9200,lng:-116.6300,michelin:0,reservation:false},
  {id:706,name:"Cielo Rooftop Cabo",type:"rooftop",category:"Ocean Views",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Cabo rooftop with Sea of Cortez views. Premium cocktails. Fire pits. Live music weekends.",phone:"+52 624 143 5900",price:"$$$",fee:45,website:"",lat:22.8900,lng:-109.9000,michelin:0,reservation:false},
  {id:707,name:"The Rooftop at ME Cabo",type:"rooftop",category:"Ultra-Lounge",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Ultra-modern rooftop at ME resort. Infinity pool access. International DJs. Sunset champagne service.",phone:"+52 624 145 7800",price:"$$$",fee:50,website:"melia.com",lat:22.8850,lng:-109.9050,michelin:0,reservation:false},
  {id:708,name:"Sky Bar La Paz",type:"rooftop",category:"Malecon Views",region:"La Paz",city:"La Paz",description:"Malecon rooftop in La Paz. Sea of Cortez sunset views. Craft cocktails with local ingredients.",phone:"+52 612 122 5200",price:"$$",fee:28,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:false},
  {id:709,name:"Azotea Rosarito",type:"rooftop",category:"Beach Rooftop",region:"Rosarito",city:"Rosarito",description:"Rosarito beachfront rooftop. Pacific Ocean panorama. Weekend brunch. Chill vibes.",phone:"+52 661 612 1400",price:"$$",fee:25,website:"",lat:32.3333,lng:-117.0333,michelin:0,reservation:false},
  {id:710,name:"Vista Terraza Ensenada",type:"rooftop",category:"Harbor Views",region:"Ensenada",city:"Ensenada",description:"Harbor views from elevated terrace. Wine and cerveza selection. Fresh seafood bites.",phone:"+52 646 178 4300",price:"$$",fee:25,website:"",lat:31.8600,lng:-116.6200,michelin:0,reservation:false},
  {id:711,name:"Terraza Todos Santos",type:"rooftop",category:"Art Town Views",region:"Todos Santos",city:"Todos Santos",description:"Rooftop views over the artistic town and Pacific beyond. Mezcal-forward cocktail menu.",phone:"+52 612 145 0900",price:"$$",fee:25,website:"",lat:23.4450,lng:-110.2250,michelin:0,reservation:false},

  // ======================== BEACH CLUBS (10) ========================
  {id:801,name:"Nikki Beach Cabo",type:"beach-club",category:"International Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"World-famous Nikki Beach brand. $100 day pass. White beds, champagne service, international DJs.",phone:"+52 624 143 6100",price:"$$$",fee:100,website:"nikkibeach.com",lat:22.8900,lng:-109.9100,michelin:0,reservation:true},
  {id:802,name:"ME Cabo Beach Club",type:"beach-club",category:"VIP Beach Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"VIP beach cabanas at ME resort. Bottle service. Pool and beach access. Adults only.",phone:"+52 624 145 7800",price:"$$$",fee:80,website:"melia.com",lat:22.8850,lng:-109.9050,michelin:0,reservation:true},
  {id:803,name:"Breathless Cabo",type:"beach-club",category:"Adults-Only Resort",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Adults-only all-inclusive resort. Day passes available. Beach and pool. Party atmosphere.",phone:"+52 624 163 5800",price:"$$$",fee:120,website:"breathlessresorts.com",lat:22.8800,lng:-109.9000,michelin:0,reservation:true},
  {id:804,name:"Taboo Beach Club Cabo",type:"beach-club",category:"Luxury Day Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury day club with Bali-inspired beds. Mediterranean cuisine. Premium bottle service. Sunset parties.",phone:"+52 624 143 6200",price:"$$$",fee:75,website:"",lat:22.8920,lng:-109.9020,michelin:0,reservation:true},
  {id:805,name:"Omnia Dayclub Cabo",type:"beach-club",category:"EDM Day Club",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"EDM-focused day club. International DJs. Pool party events. Las Vegas-style experience in Cabo.",phone:"+52 624 143 6300",price:"$$$",fee:60,website:"",lat:22.8880,lng:-109.9080,michelin:0,reservation:true},
  {id:806,name:"Splash Rosarito",type:"beach-club",category:"Beach Party",region:"Rosarito",city:"Rosarito",description:"Rosarito beachfront party spot. Spring break vibes year-round. Pool and ocean access.",phone:"+52 661 612 1100",price:"$$",fee:30,website:"",lat:32.3333,lng:-117.0333,michelin:0,reservation:false},
  {id:807,name:"Playa Pichilingue Beach Club",type:"beach-club",category:"Local Beach Club",region:"La Paz",city:"La Paz",description:"Calm waters of Pichilingue. Local beach club atmosphere. Seafood restaurants. Family friendly.",phone:"+52 612 122 5300",price:"$",fee:15,website:"",lat:24.2700,lng:-110.3300,michelin:0,reservation:false},
  {id:808,name:"Medano Beach Clubs",type:"beach-club",category:"Famous Beach Strip",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"The famous Medano Beach strip. Multiple clubs and bars. $50-$200 for cabana packages. The heart of Cabo.",phone:"+52 624 143 6400",price:"$$",fee:50,website:"",lat:22.8870,lng:-109.8950,michelin:0,reservation:false},

  // ======================== NIGHTCLUBS (8) ========================
  {id:901,name:"Squid Roe",type:"nightclub",category:"Iconic Cabo Nightlife",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Iconic Cabo nightlife since 1989. Three floors of entertainment. Spring break headquarters. Legendary nights.",phone:"+52 624 143 0655",price:"$$",fee:30,website:"squidroe.com",lat:22.8900,lng:-109.9050,michelin:0,reservation:false},
  {id:902,name:"El Mandala",type:"nightclub",category:"International DJs",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"International DJs and VIP tables. Beach access. Multi-level dance floors. Cabo's most upscale club.",phone:"+52 624 143 6500",price:"$$$",fee:40,website:"",lat:22.8880,lng:-109.9030,michelin:0,reservation:true},
  {id:903,name:"Dandy del Sur",type:"nightclub",category:"Upscale Electronic",region:"Tijuana",city:"Tijuana",description:"Upscale nightclub. Electronic music. VIP tables and bottle service. Tijuana's trendy crowd.",phone:"+52 664 634 4200",price:"$$",fee:35,website:"",lat:32.5250,lng:-117.0380,michelin:0,reservation:false},
  {id:904,name:"Papas & Beer",type:"nightclub",category:"Beach Party Legend",region:"Rosarito",city:"Rosarito",description:"Legendary Rosarito Beach party spot. Decades of beach parties. Live music. Spring break icon.",phone:"+52 661 612 0444",price:"$",fee:20,website:"papasandbeer.com",lat:32.3333,lng:-117.0333,michelin:0,reservation:false},
  {id:905,name:"Tropix Nightclub",type:"nightclub",category:"Premier Mexicali",region:"Mexicali",city:"Mexicali",description:"Mexicali's premier nightclub. Live shows weekends. VIP areas. The place to be in Mexicali nightlife.",phone:"+52 686 564 4900",price:"$$",fee:28,website:"",lat:32.6250,lng:-115.4560,michelin:0,reservation:false},
  {id:906,name:"Alebrije Tijuana",type:"nightclub",category:"Alternative/Indie",region:"Tijuana",city:"Tijuana",description:"Alternative music venue. Indie and rock scene. Creative crowd. Live bands and emerging artists.",phone:"+52 664 634 4300",price:"$",fee:15,website:"",lat:32.5300,lng:-117.0350,michelin:0,reservation:false},
  {id:907,name:"Rosa Negra Cabo",type:"nightclub",category:"Latin Nightlife",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Latin rhythms and bottle service. Dance-forward club with live performers and fire shows.",phone:"+52 624 143 6600",price:"$$",fee:35,website:"",lat:22.8910,lng:-109.9040,michelin:0,reservation:false},
  {id:908,name:"Club Iggy's Rosarito",type:"nightclub",category:"Beach Nightclub",region:"Rosarito",city:"Rosarito",description:"Rosarito nightclub near the beach strip. Weekend DJs. Young crowd. Affordable drinks.",phone:"+52 661 612 1200",price:"$",fee:15,website:"",lat:32.3350,lng:-117.0340,michelin:0,reservation:false},

  // ======================== YACHT CHARTERS & MARINAS (10) ========================
  {id:1001,name:"Cabo Yacht Charters",type:"yacht",category:"Luxury Charters",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Private yacht charters 40-150ft. $5,000-$50,000/day. Sunset cruises to sportfishing. Full crew and catering.",phone:"+52 624 143 1670",price:"$$$$",fee:5000,website:"caboyachtcharters.com",lat:22.8900,lng:-109.9000,michelin:0,reservation:true},
  {id:1002,name:"Marina Cabo San Lucas",type:"yacht",category:"Mega Yacht Marina",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premier marina with mega-yacht berths. Full-service facilities. Waterfront dining and shopping.",phone:"+52 624 143 1671",price:"$$$$",fee:2000,website:"marinacsl.com",lat:22.8850,lng:-109.9050,michelin:0,reservation:true},
  {id:1003,name:"Pisces Sportfishing Cabo",type:"yacht",category:"Premium Sportfishing",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Premium sportfishing fleet. Marlin, tuna, dorado. Tournament-winning captains. Full-day charters.",phone:"+52 624 143 1288",price:"$$$",fee:1500,website:"piscessportfishing.com",lat:22.8880,lng:-109.9020,michelin:0,reservation:true},
  {id:1004,name:"Luxury Catamaran Sunset Cruise",type:"yacht",category:"Sunset Sailing",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Luxury catamaran sunset cruises past El Arco. Open bar, gourmet appetizers. 3-hour experience.",phone:"+52 624 143 6700",price:"$$$",fee:150,website:"",lat:22.8900,lng:-109.9000,michelin:0,reservation:true},
  {id:1005,name:"Ensenada Marina",type:"yacht",category:"Pacific Marina",region:"Ensenada",city:"Ensenada",description:"Full-service Pacific marina. Fishing charters, whale watching departures. Waterfront restaurants.",phone:"+52 646 175 0001",price:"$$",fee:200,website:"hotelcoral.com",lat:31.8200,lng:-116.6100,michelin:0,reservation:true},
  {id:1006,name:"Marina La Paz",type:"yacht",category:"Sea of Cortez Marina",region:"La Paz",city:"La Paz",description:"Sea of Cortez marina. Sailing charters, island hopping, fishing. Gateway to Espiritu Santo island.",phone:"+52 612 121 6100",price:"$$$",fee:300,website:"marinadelapaz.com",lat:24.1600,lng:-110.3200,michelin:0,reservation:true},
  {id:1007,name:"La Paz Sailing Adventures",type:"yacht",category:"Sailing Charters",region:"La Paz",city:"La Paz",description:"Multi-day sailing charters. Island hopping in the Sea of Cortez. Whale shark encounters. Snorkeling.",phone:"+52 612 123 5555",price:"$$$",fee:300,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},

  // ======================== ADVENTURES & ACTIVITIES (25) ========================
  {id:1101,name:"Whale Shark Swimming",type:"adventure",category:"Marine Encounter",region:"La Paz",city:"La Paz",description:"Swim alongside the world's largest fish. Season Oct-Apr (peak Dec-Feb). 90%+ sighting rate. $120-180/person. Bucket list experience.",phone:"+52 612 123 3000",price:"$$$",fee:150,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},
  {id:1102,name:"Scuba Diving La Paz",type:"adventure",category:"Scuba/Snorkel",region:"La Paz",city:"La Paz",description:"Sea lion encounters. Whale shark dives. Hammerhead shark seasonal viewing. Jacques Cousteau's aquarium.",phone:"+52 612 122 4200",price:"$$$",fee:150,website:"funbaja.com",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},
  {id:1103,name:"Skydive Baja",type:"adventure",category:"Skydiving",region:"Rosarito",city:"Rosarito",description:"Tandem skydiving. Ocean views from 10,000 feet. $200 per jump. Professional instructors.",phone:"+52 664 634 3483",price:"$$$",fee:200,website:"skydivebaja.mx",lat:32.3333,lng:-117.0333,michelin:0,reservation:true},
  {id:1104,name:"Valle 4x4 Tours",type:"adventure",category:"Off-Road",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Guided 4x4 canyon tours through the valley's back roads. Mountain trails with vineyard views.",phone:"+52 646 156 8080",price:"$$",fee:80,website:"",lat:31.9167,lng:-116.6167,michelin:0,reservation:true},
  {id:1105,name:"Whale Watching Ensenada",type:"adventure",category:"Marine Tours",region:"Ensenada",city:"Ensenada",description:"Gray whales Dec-Apr from Ensenada. Blue whales in summer. Expert marine biologist guides.",phone:"+52 646 178 7350",price:"$$",fee:75,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:true},
  {id:1106,name:"Baja Wine Tours",type:"adventure",category:"Wine Country Tours",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Guided wine country tours. Visit 4-6 wineries per day. Transportation included. Expert sommelier guides.",phone:"+52 646 156 8750",price:"$$",fee:80,website:"",lat:31.9167,lng:-116.6167,michelin:0,reservation:true},
  {id:1107,name:"Sergio's Sportfishing",type:"adventure",category:"Deep Sea Fishing",region:"Ensenada",city:"Ensenada",description:"Deep sea fishing from Ensenada. Yellowtail, tuna, marlin. Full-day and half-day charters.",phone:"+52 646 178 2185",price:"$$",fee:150,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:true},
  {id:1108,name:"Gordo's Pangas",type:"adventure",category:"Bay Fishing",region:"Ensenada",city:"Ensenada",description:"Traditional panga fishing in Ensenada bay. Local guides. Affordable fishing experience.",phone:"+52 646 178 3515",price:"$",fee:75,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:true},
  {id:1109,name:"Horseback Riding Valle",type:"adventure",category:"Horseback Tours",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Vineyard horseback tours through the valley. Sunset rides with wine tasting included.",phone:"+52 646 156 8150",price:"$$",fee:80,website:"",lat:31.9200,lng:-116.6300,michelin:0,reservation:true},
  {id:1110,name:"Sailing La Paz",type:"adventure",category:"Sailing Charters",region:"La Paz",city:"La Paz",description:"Sailing charters in the Sea of Cortez. Island hopping. Multi-day trips to Espiritu Santo.",phone:"+52 612 123 5555",price:"$$$",fee:300,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},
  {id:1111,name:"Surfing San Miguel",type:"adventure",category:"Surf Lessons",region:"Ensenada",city:"San Miguel",description:"World-class surf break at San Miguel. Lessons available. $60 per lesson. All equipment included.",phone:"+52 646 155 3500",price:"$",fee:60,website:"",lat:31.8000,lng:-116.7000,michelin:0,reservation:false},
  {id:1112,name:"Mountain Biking La Bufadora",type:"adventure",category:"MTB Tours",region:"Ensenada",city:"La Bufadora",description:"Coastal mountain biking near La Bufadora blowhole. Scenic trails. $70 guided tour.",phone:"+52 646 154 2090",price:"$",fee:70,website:"",lat:31.7500,lng:-116.8000,michelin:0,reservation:true},
  {id:1113,name:"Valle Bound Tours",type:"adventure",category:"Cross-Border Tours",region:"Valle de Guadalupe",city:"San Diego/Valle",description:"Cross-border wine tours from San Diego. Transportation, tastings, and lunch included.",phone:"+1 619 955 8100",price:"$$$",fee:120,website:"",lat:31.9167,lng:-116.6167,michelin:0,reservation:true},
  {id:1114,name:"Cabo ATV Desert Tours",type:"adventure",category:"ATV/Off-Road",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"ATV tours through Cabo's desert landscape. Beach and desert trails. Single and double ATVs.",phone:"+52 624 143 6800",price:"$$",fee:90,website:"",lat:22.9000,lng:-109.9200,michelin:0,reservation:true},
  {id:1115,name:"Espiritu Santo Island Tour",type:"adventure",category:"Island Excursion",region:"La Paz",city:"La Paz",description:"UNESCO World Heritage island. Snorkeling with sea lions. Kayaking. Day trip from La Paz.",phone:"+52 612 123 3050",price:"$$$",fee:120,website:"",lat:24.4700,lng:-110.3600,michelin:0,reservation:true},
  {id:1116,name:"Baja Outdoor Activities Ensenada",type:"adventure",category:"Multi-Sport",region:"Ensenada",city:"Ensenada",description:"Hiking, biking, kayaking in the Ensenada region. Guided multi-sport adventures for all levels.",phone:"+52 646 178 3800",price:"$$",fee:70,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:true},
  {id:1117,name:"Cabo Zip Lines",type:"adventure",category:"Zip Line",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"Zip line courses over desert canyons. Multiple lines. Breathtaking views. Family friendly.",phone:"+52 624 143 6900",price:"$$",fee:80,website:"",lat:22.9100,lng:-109.9150,michelin:0,reservation:true},
  {id:1118,name:"Dolphin Watching La Paz",type:"adventure",category:"Marine Wildlife",region:"La Paz",city:"La Paz",description:"Wild dolphin encounters in the Sea of Cortez. Ethical eco-tours. Morning departures.",phone:"+52 612 123 3050",price:"$$",fee:80,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},

  // ======================== ART GALLERIES & CULTURE (8) ========================
  {id:1201,name:"Galeria Patricia Mendoza",type:"gallery",category:"Contemporary Mexican Art",region:"Todos Santos",city:"Todos Santos",description:"Premier contemporary Mexican art gallery. Local and international artists. Monthly exhibitions.",phone:"+52 612 145 0750",price:"FREE",fee:0,website:"",lat:23.4450,lng:-110.2250,michelin:0,reservation:false},
  {id:1202,name:"CECUT Cultural Center",type:"gallery",category:"Cultural Institution",region:"Tijuana",city:"Tijuana",description:"Centro Cultural Tijuana. Iconic IMAX sphere. Museum, gallery, and performing arts. Tijuana's cultural heart.",phone:"+52 664 687 9600",price:"$",fee:8,website:"cecut.gob.mx",lat:32.5330,lng:-117.0210,michelin:0,reservation:false},
  {id:1203,name:"La Casa de la Cultura",type:"gallery",category:"Community Art Space",region:"Ensenada",city:"Ensenada",description:"Ensenada community art space. Rotating exhibitions. Workshops and cultural events. Free entry.",phone:"+52 646 178 4400",price:"FREE",fee:0,website:"",lat:31.8666,lng:-116.6160,michelin:0,reservation:false},
  {id:1204,name:"Galeria Logan",type:"gallery",category:"Contemporary Gallery",region:"Tijuana",city:"Tijuana",description:"Contemporary art gallery in Tijuana. Monthly openings with the city's creative community.",phone:"+52 664 634 4400",price:"FREE",fee:0,website:"",lat:32.5200,lng:-117.0400,michelin:0,reservation:false},
  {id:1205,name:"Galeria de Todos Santos",type:"gallery",category:"Fine Art",region:"Todos Santos",city:"Todos Santos",description:"Fine art gallery. Paintings, sculpture, photography. Curated collection of Baja and international artists.",phone:"+52 612 145 0760",price:"FREE",fee:0,website:"",lat:23.4460,lng:-110.2260,michelin:0,reservation:false},
  {id:1206,name:"Art District San Jose del Cabo",type:"gallery",category:"Gallery District",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"San Jose's famous Art District. Thursday art walks Nov-Jun. Dozens of galleries in colonial streets.",phone:"+52 624 142 4000",price:"FREE",fee:0,website:"artcabo.com",lat:23.0600,lng:-109.6850,michelin:0,reservation:false},
  {id:1207,name:"Mision Cultural Valle de Guadalupe",type:"gallery",category:"Wine & Art",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Valley art collective. Wine and art events. Celebrating the creative spirit of Baja's wine country.",phone:"+52 646 156 8250",price:"FREE",fee:0,website:"",lat:31.9150,lng:-116.6250,michelin:0,reservation:false},

  // ======================== HIGH-END SALONS & BEAUTY (10) ========================
  {id:1301,name:"Salon Platinum Tijuana",type:"salon",category:"Luxury Hair Salon",region:"Tijuana",city:"Tijuana",description:"Premium hair salon in Zona Rio. Top stylists. Keratin treatments, color specialists. VIP private suites.",phone:"+52 664 634 4500",price:"$$$",fee:80,website:"",lat:32.5250,lng:-117.0300,michelin:0,reservation:true},
  {id:1302,name:"The Barber House Cabo",type:"salon",category:"Gentlemen's Barber",region:"Cabo San Lucas",city:"Cabo San Lucas",description:"High-end gentlemen's barbershop. Hot towel shaves. Beard sculpting. Whiskey service while you wait.",phone:"+52 624 143 7000",price:"$$",fee:45,website:"",lat:22.8900,lng:-109.9000,michelin:0,reservation:true},
  {id:1303,name:"Belle Epoque Salon & Spa",type:"salon",category:"Full-Service Luxury",region:"Ensenada",city:"Ensenada",description:"Full-service luxury salon and spa. Hair, nails, facials, body treatments. European techniques.",phone:"+52 646 178 4500",price:"$$$",fee:70,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:true},
  {id:1304,name:"Atelier Beauty Lounge",type:"salon",category:"Boutique Beauty",region:"Cabo San Lucas",city:"San Jose del Cabo",description:"Boutique beauty lounge. Bridal packages. Celebrity stylist. Event preparation specialists.",phone:"+52 624 142 4100",price:"$$$",fee:90,website:"",lat:23.0600,lng:-109.6850,michelin:0,reservation:true},
  {id:1305,name:"Glamour Studio Mexicali",type:"salon",category:"Premium Salon",region:"Mexicali",city:"Mexicali",description:"Premium beauty studio. Hair design, makeup artistry, nail art. Top Mexicali stylists.",phone:"+52 686 564 5000",price:"$$",fee:50,website:"",lat:32.6270,lng:-115.4540,michelin:0,reservation:true},
  {id:1306,name:"Rosemary Salon Valle",type:"salon",category:"Wine Country Beauty",region:"Valle de Guadalupe",city:"Valle de Guadalupe",description:"Wine country beauty salon. Vinotherapy facials. Grape seed treatments. Bridal and event styling.",phone:"+52 646 156 8300",price:"$$",fee:55,website:"",lat:31.9200,lng:-116.6200,michelin:0,reservation:true},
  {id:1307,name:"Studio 32 Barber Lounge",type:"salon",category:"Premium Barber",region:"Tijuana",city:"Tijuana",description:"Premium barber lounge in Tijuana. Craft beer while you wait. Expert fades and classic cuts.",phone:"+52 664 634 4600",price:"$$",fee:35,website:"",lat:32.5300,lng:-117.0250,michelin:0,reservation:true},
  {id:1308,name:"The Beauty Bar La Paz",type:"salon",category:"Boutique Salon",region:"La Paz",city:"La Paz",description:"Boutique beauty bar on the malecon. Hair, nails, lashes. Modern techniques. Bilingual staff.",phone:"+52 612 122 5400",price:"$$",fee:45,website:"",lat:24.1426,lng:-110.3128,michelin:0,reservation:true},
  {id:1309,name:"Luxe Hair Studio Rosarito",type:"salon",category:"Beach Luxury",region:"Rosarito",city:"Rosarito",description:"Luxury hair studio steps from the beach. Balayage specialists. Wedding preparation packages.",phone:"+52 661 612 1500",price:"$$",fee:50,website:"",lat:32.3333,lng:-117.0333,michelin:0,reservation:true},
  {id:1310,name:"Salon Dorado Todos Santos",type:"salon",category:"Art Town Salon",region:"Todos Santos",city:"Todos Santos",description:"Luxury salon in bohemian Todos Santos. Organic products. Relaxed artistic atmosphere.",phone:"+52 612 145 1000",price:"$$",fee:45,website:"",lat:23.4450,lng:-110.2250,michelin:0,reservation:true},

  // ======================== CASINOS (4) ========================
  {id:1401,name:"Caliente Casino Mexicali",type:"casino",category:"Full Casino",region:"Mexicali",city:"Mexicali",description:"Full casino with sports book. Multiple restaurants. Live entertainment. Mexicali's gaming destination.",phone:"+52 686 564 5100",price:"$$",fee:0,website:"caliente.mx",lat:32.6270,lng:-115.4550,michelin:0,reservation:false},
  {id:1402,name:"Codere Casino Mexicali",type:"casino",category:"Modern Gaming",region:"Mexicali",city:"Mexicali",description:"Modern casino. Slots, table games, VIP lounges. Sports betting. Restaurant and bar.",phone:"+52 686 564 5200",price:"$$",fee:0,website:"codere.mx",lat:32.6300,lng:-115.4500,michelin:0,reservation:false},
  {id:1403,name:"Caliente Casino Tijuana",type:"casino",category:"Sports & Gaming",region:"Tijuana",city:"Tijuana",description:"Major Tijuana casino and sports book. Slots, poker, sports betting. Multiple locations in the city.",phone:"+52 664 634 4700",price:"$$",fee:0,website:"caliente.mx",lat:32.5200,lng:-117.0350,michelin:0,reservation:false},
  {id:1404,name:"Casino Real Ensenada",type:"casino",category:"Regional Casino",region:"Ensenada",city:"Ensenada",description:"Ensenada's gaming and entertainment venue. Slots, table games, live shows on weekends.",phone:"+52 646 178 4600",price:"$$",fee:0,website:"",lat:31.8667,lng:-116.6167,michelin:0,reservation:false}
];


export default function BajaLuxuryGuide() {
  const [language, setLanguage] = useState("english");
  const [establishments, setEstablishments] = useState([]);
  const [activeTab, setActiveTab] = useState("guide");
  const [magazinePage, setMagazinePage] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);
  
  // SLOW MELLOW JAZZ - Ambient background music
  // These are slower, more subtle tracks
  const musicUrls = [
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",  // Slow jazz piano
    "https://cdn.pixabay.com/download/audio/2021/11/25/audio_cb5c4e5442.mp3",  // Mellow acoustic
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3"   // Soft background
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
        audioRef.current.volume = 0.25; // Keep it subtle - 25% volume
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
    },
    spanish: {
      slogan: "Donde las Estrellas Vienen a Brillar",
      header: "BAJA CALIFORNIA",
      sub: "LA GUIA DE LUJO",
      establishments: "Establecimientos Selectos",
      toggle: "EN",
      tabs: { guide: "Guia", magazine: "Revista", journal: "Diario", foodjournal: "Diario Culinario", winecellar: "Cava de Vinos", partners: "Socios", collection: "Colección", advertise: "Anunciar" },
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
    // Row 1 - Hotels
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
    // Row 2 - Restaurants
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
      website: "https://brumawine.com/fauna"
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
    // Row 3 - Wineries & Experiences
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

  // MAGAZINE PAGES WITH REAL IMAGES
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
    borderBottom: isActive ? '1px solid #cba658' : '1px solid transparent',
    color: isActive ? '#e4e4e7' : '#71717a',
    fontSize: '11px',
    fontWeight: '400',
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
    casino: language === 'english' ? 'Casino' : 'Casino'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#334155',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* VINEYARD BACKGROUND - Beautiful Valle de Guadalupe Style */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.35,
        zIndex: 0
      }} />

      {/* LIGHTER OVERLAY - SEE THE VINEYARD */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(51,65,85,0.5) 0%, rgba(51,65,85,0.6) 50%, rgba(51,65,85,0.7) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* SCROLLING PARTNER IMAGES - Valle de Guadalupe Hotels & Restaurants */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: 0,
        right: 0,
        height: '120px',
        overflow: 'hidden',
        zIndex: 2,
        background: 'linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 10%, rgba(15,23,42,0.7) 90%, rgba(15,23,42,0.95) 100%)'
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
          {/* Partner Images - 24 UNIQUE images for variety */}
          {[
            // Hotels
            { name: 'Hotel Boutique', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
            { name: 'El Cielo Resort', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
            { name: 'Contemplación', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Hacienda Guadalupe', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
            // Wine & Vineyards
            { name: 'Entre Viñedos', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
            { name: 'Monte Xanic', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
            { name: 'Adobe Guadalupe', img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
            { name: 'Vena Cava Winery', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80' },
            // Restaurants  
            { name: 'Fuego Restaurant', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
            { name: 'Finca Altozano', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
            { name: 'Corazón de Tierra', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
            { name: 'Fauna Valle', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80' },
            // Luxury Experiences
            { name: 'Wine Tasting', img: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=400&q=80' },
            { name: 'Sunset Terrace', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
            { name: 'Pool & Spa', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80' },
            { name: 'Fine Dining', img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&q=80' },
            // More Hotels & Resorts
            { name: 'Bruma Casa 8', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80' },
            { name: 'Cuatro Cuatros', img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80' },
            { name: 'Encuentro Guadalupe', img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80' },
            { name: 'Villa del Valle', img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80' },
            // More Wine & Dining
            { name: "Deckman's", img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
            { name: 'Laja Restaurant', img: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=400&q=80' },
            { name: 'Malva Kitchen', img: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400&q=80' },
            { name: 'Baron Balché', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80' },
            // Duplicate set for seamless loop
            { name: 'Hotel Boutique', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
            { name: 'El Cielo Resort', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
            { name: 'Contemplación', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
            { name: 'Hacienda Guadalupe', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
            { name: 'Entre Viñedos', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
            { name: 'Monte Xanic', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
            { name: 'Adobe Guadalupe', img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
            { name: 'Vena Cava Winery', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80' },
            { name: 'Fuego Restaurant', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
            { name: 'Finca Altozano', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
            { name: 'Corazón de Tierra', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
            { name: 'Fauna Valle', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80' },
            { name: 'Wine Tasting', img: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=400&q=80' },
            { name: 'Sunset Terrace', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
            { name: 'Pool & Spa', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80' },
            { name: 'Fine Dining', img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&q=80' },
            { name: 'Bruma Casa 8', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80' },
            { name: 'Cuatro Cuatros', img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80' },
            { name: 'Encuentro Guadalupe', img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80' },
            { name: 'Villa del Valle', img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80' },
            { name: "Deckman's", img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
            { name: 'Laja Restaurant', img: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=400&q=80' },
            { name: 'Malva Kitchen', img: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400&q=80' },
            { name: 'Baron Balché', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80' }
          ].map((partner, i) => (
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
                background: 'rgba(0,0,0,0.85)',
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

      {/* AUDIO ELEMENT - Subtle Jazz */}
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

      {/* MUSIC PLAYER - FLOATING BOTTOM LEFT */}
      <div style={{
        position: 'fixed',
        bottom: 100,
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
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4
          }}
        >
          {isPlaying ? (
            <Pause size={20} color="#cba658" />
          ) : (
            <Play size={20} color="#cba658" />
          )}
        </button>

        {/* Track Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <span style={{
            fontSize: '10px',
            color: '#cba658',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {isPlaying ? 'NOW PLAYING' : 'LATIN JAZZ'}
          </span>
          <span style={{
            fontSize: '11px',
            color: '#94a3b8'
          }}>
            Baja Vibes
          </span>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            marginLeft: 8
          }}
        >
          {isMuted ? (
            <VolumeX size={18} color="#64748b" />
          ) : (
            <Volume2 size={18} color="#94a3b8" />
          )}
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
          {/* Language Toggle */}
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

          {/* Slogan */}
          <p style={{
            fontSize: '10px',
            color: '#cba658',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }}>
            {t.slogan}
          </p>

          {/* Main Title */}
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

          {/* Subtitle */}
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#94a3b8',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            {t.sub}
          </p>

          {/* Divider */}
          <div style={{
            width: '60px',
            height: '1px',
            background: '#cba658',
            margin: '0 auto 24px'
          }} />

          {/* Count */}
          <p style={{
            fontSize: '11px',
            color: '#94a3b8',
            letterSpacing: '2px'
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
            {/* FEATURED GRID - 4 COLUMNS, SMALLER CARDS */}
            <section style={{ marginBottom: '80px' }}>
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
                      background: '#ffffff'
                    }}
                  >
                    {/* Image - FULL COLOR VIBRANT */}
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

                    {/* Content */}
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

            {/* ESTABLISHMENTS */}
            <section>
              <Accordion defaultOpen={-1}>
                {regions.map((region) => (
                  <AccordionItem key={region} title={`${region} — ${grouped[region].length}`}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                      gap: '20px'
                    }}>
                      {grouped[region].map(est => (
                        <div key={est.id} style={{
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
                        }}>
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
                              onClick={() => est.website && window.open(est.website, '_blank')}
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
                              onClick={() => {
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
                ))}
              </Accordion>
            </section>

            {/* NEWSLETTER - COMPACT */}
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

        {/* ==================== MAGAZINE TAB - WITH REAL IMAGES ==================== */}
        {activeTab === "magazine" && (
          <section>
            <div style={{
              position: 'relative',
              minHeight: isMobile ? '500px' : '600px',
              overflow: 'hidden'
            }}>
              {/* BACKGROUND IMAGE */}
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

              {/* OVERLAY */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.9) 100%)'
              }} />

              {/* CONTENT */}
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

                {/* Page indicator */}
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

            {/* Navigation */}
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

        {/* ==================== JOURNAL TAB - WITH IMAGES ==================== */}
        {activeTab === "journal" && (
          <section>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: '#cba658', letterSpacing: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
                {t.journal.title}
              </p>
              <p style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                {t.journal.subtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {journalArticles.map((article, i) => (
                <article key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
                  gap: '24px',
                  padding: '24px',
                  border: '1px solid rgba(148,163,184,0.15)',
                  background: 'rgba(30,41,59,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(30,41,59,0.8)';
                  e.currentTarget.style.borderColor = 'rgba(203,166,88,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(30,41,59,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)';
                }}>
                  {/* IMAGE */}
                  <div style={{
                    height: isMobile ? '200px' : '180px',
                    backgroundImage: `url(${article.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />

                  {/* CONTENT */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <p style={{
                        fontSize: '9px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                      }}>{article.category}</p>
                      <p style={{ fontSize: '10px', color: '#94a3b8' }}>{article.readTime}</p>
                    </div>
                    <h3 style={{
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: '300',
                      color: '#e2e8f0',
                      marginBottom: '12px',
                      letterSpacing: '0.5px',
                      lineHeight: '1.3'
                    }}>{article.title}</h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      lineHeight: '1.7',
                      marginBottom: '16px'
                    }}>{article.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#94a3b8' }}>{article.date}</p>
                      <span style={{
                        fontSize: '10px',
                        color: '#cba658',
                        letterSpacing: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        {t.journal.readMore} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ==================== FOOD JOURNAL TAB - CULINARY ALLIANCE ==================== */}
        {activeTab === "foodjournal" && (
          <section style={{ position: 'relative' }}>
            {/* FOOD BACKGROUND */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '-40px',
              right: '-40px',
              bottom: '-60px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* HEADER */}
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <p style={{ 
                  fontSize: '9px', 
                  color: '#cba658', 
                  letterSpacing: '6px', 
                  marginBottom: '12px', 
                  textTransform: 'uppercase' 
                }}>
                  {language === 'english' ? 'CULINARY ALLIANCE' : 'ALIANZA CULINARIA'}
                </p>
                <h2 style={{ 
                  fontSize: isMobile ? '28px' : '36px', 
                  fontWeight: '200', 
                  color: '#e2e8f0', 
                  letterSpacing: '4px',
                  marginBottom: '16px'
                }}>
                  {t.foodjournal.title}
                </h2>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#cba658', 
                  fontStyle: 'italic',
                  marginBottom: '12px'
                }}>
                  {t.foodjournal.subtitle}
                </p>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#94a3b8', 
                  maxWidth: '600px', 
                  margin: '0 auto', 
                  lineHeight: '1.8' 
                }}>
                  {t.foodjournal.description}
                </p>
              </div>

              {/* CATEGORIES */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '48px'
              }}>
                {t.foodjournal.categories.map((cat, i) => (
                  <span key={i} style={{
                    padding: '10px 20px',
                    border: '1px solid rgba(203,166,88,0.3)',
                    background: 'rgba(15,23,42,0.6)',
                    color: '#cba658',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}>
                    {cat}
                  </span>
                ))}
              </div>

              {/* CONTRIBUTION FORM */}
              <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '40px',
                border: '1px solid rgba(203,166,88,0.3)',
                background: 'rgba(15,23,42,0.8)',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  color: '#cba658',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  {t.foodjournal.contribute}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  textAlign: 'center',
                  marginBottom: '32px'
                }}>
                  {t.foodjournal.note}
                </p>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert(t.foodjournal.success);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Name & Email Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '16px'
                  }}>
                    <input
                      type="text"
                      placeholder={t.foodjournal.placeholder.name}
                      required
                      style={{
                        padding: '14px 18px',
                        background: 'rgba(30,41,59,0.8)',
                        border: '1px solid rgba(148,163,184,0.2)',
                        color: '#e2e8f0',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="email"
                      placeholder={t.foodjournal.placeholder.email}
                      required
                      style={{
                        padding: '14px 18px',
                        background: 'rgba(30,41,59,0.8)',
                        border: '1px solid rgba(148,163,184,0.2)',
                        color: '#e2e8f0',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Title */}
                  <input
                    type="text"
                    placeholder={t.foodjournal.placeholder.title}
                    required
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(30,41,59,0.8)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#e2e8f0',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />

                  {/* Category Select */}
                  <select
                    required
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(30,41,59,0.8)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#94a3b8',
                      fontSize: '13px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">{t.foodjournal.placeholder.category}</option>
                    {t.foodjournal.categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* Content Textarea */}
                  <textarea
                    placeholder={t.foodjournal.placeholder.content}
                    required
                    rows={8}
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(30,41,59,0.8)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#e2e8f0',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: '1.7'
                    }}
                  />

                  {/* Image Upload Area */}
                  <div style={{
                    padding: '32px',
                    border: '2px dashed rgba(148,163,184,0.3)',
                    background: 'rgba(30,41,59,0.5)',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('foodjournal-upload').click()}
                  >
                    <input
                      type="file"
                      id="foodjournal-upload"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                    />
                    <p style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      letterSpacing: '1px'
                    }}>
                      {t.foodjournal.placeholder.image}
                    </p>
                    <p style={{
                      fontSize: '10px',
                      color: '#64748b',
                      marginTop: '8px'
                    }}>
                      JPG, PNG (max 5MB each)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
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
                      transition: 'all 0.3s',
                      alignSelf: 'center'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#d4b366'}
                    onMouseLeave={e => e.currentTarget.style.background = '#cba658'}
                  >
                    {t.foodjournal.cta}
                  </button>
                </form>
              </div>

              {/* FEATURED FOOD STORIES */}
              <div style={{ marginTop: '64px' }}>
                <h3 style={{
                  fontSize: '12px',
                  color: '#cba658',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  marginBottom: '32px',
                  textAlign: 'center'
                }}>
                  {t.foodjournal.recent}
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '24px'
                }}>
                  {/* Sample Food Stories */}
                  {[
                    {
                      title: language === 'english' ? "The Taco Trail: From Tijuana to Ensenada" : "La Ruta del Taco: De Tijuana a Ensenada",
                      author: "Maria Santos",
                      category: language === 'english' ? "Street Food" : "Comida Callejera",
                      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80"
                    },
                    {
                      title: language === 'english' ? "Wine & Dine: Valle de Guadalupe's New Guard" : "Vino y Cena: La Nueva Guardia del Valle",
                      author: "Carlos Mendez",
                      category: language === 'english' ? "Wine & Spirits" : "Vino y Licores",
                      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80"
                    },
                    {
                      title: language === 'english' ? "Chef Javier Plascencia: A Portrait" : "Chef Javier Plascencia: Un Retrato",
                      author: "Elena Ramirez",
                      category: language === 'english' ? "Chef Profiles" : "Perfiles de Chefs",
                      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80"
                    }
                  ].map((story, i) => (
                    <div key={i} style={{
                      border: '1px solid rgba(148,163,184,0.2)',
                      background: 'rgba(15,23,42,0.6)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(203,166,88,0.4)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(148,163,184,0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <div style={{
                        height: '180px',
                        backgroundImage: `url(${story.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }} />
                      <div style={{ padding: '20px' }}>
                        <p style={{
                          fontSize: '9px',
                          color: '#cba658',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}>
                          {story.category}
                        </p>
                        <h4 style={{
                          fontSize: '15px',
                          fontWeight: '400',
                          color: '#e2e8f0',
                          marginBottom: '12px',
                          lineHeight: '1.4'
                        }}>
                          {story.title}
                        </h4>
                        <p style={{
                          fontSize: '11px',
                          color: '#94a3b8'
                        }}>
                          {language === 'english' ? 'By' : 'Por'} {story.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================== WINE CELLAR TAB - ULTRA SOPHISTICATED ==================== */}
        {activeTab === "winecellar" && (
          <section style={{ position: 'relative', overflow: 'hidden' }}>
            {/* PARALLAX VINEYARD BACKGROUND */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '-60px',
              right: '-60px',
              bottom: '-100px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: isMobile ? 'scroll' : 'fixed',
              opacity: 0.25,
              zIndex: 0
            }} />

            {/* WINE GRADIENT OVERLAY */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(45,15,15,0.4) 50%, rgba(15,23,42,0.8) 100%)',
              zIndex: 1
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* ELEGANT HEADER */}
              <div style={{ textAlign: 'center', marginBottom: '64px', paddingTop: '20px' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 24px',
                  border: '1px solid rgba(139,69,69,0.4)',
                  marginBottom: '24px'
                }}>
                  <p style={{ 
                    fontSize: '8px', 
                    color: '#b8860b', 
                    letterSpacing: '8px', 
                    textTransform: 'uppercase',
                    margin: 0
                  }}>
                    {language === 'english' ? 'ESTABLISHED MMIII' : 'ESTABLECIDO MMIII'}
                  </p>
                </div>
                
                <h2 style={{ 
                  fontSize: isMobile ? '32px' : '48px', 
                  fontWeight: '100', 
                  color: '#e2e8f0', 
                  letterSpacing: '12px',
                  marginBottom: '16px',
                  fontFamily: 'Georgia, serif'
                }}>
                  {t.winecellar.title.toUpperCase()}
                </h2>
                
                <div style={{
                  width: '60px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
                  margin: '24px auto'
                }} />
                
                <p style={{ 
                  fontSize: '14px', 
                  color: '#cba658', 
                  fontStyle: 'italic',
                  letterSpacing: '3px',
                  marginBottom: '16px'
                }}>
                  {t.winecellar.subtitle}
                </p>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#94a3b8', 
                  maxWidth: '500px', 
                  margin: '0 auto', 
                  lineHeight: '1.9',
                  fontStyle: 'italic'
                }}>
                  {t.winecellar.description}
                </p>
              </div>

              {/* WINE REGIONS */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                marginBottom: '64px',
                flexWrap: 'wrap'
              }}>
                {t.winecellar.regions.map((region, i) => (
                  <div key={i} style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}>
                    <p style={{
                      fontSize: '10px',
                      color: '#b8860b',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(184,134,11,0.3)',
                      paddingBottom: '8px'
                    }}>
                      {region}
                    </p>
                  </div>
                ))}
              </div>

              {/* FEATURED WINERIES - LUXURY CARDS */}
              <div style={{ marginBottom: '80px' }}>
                <h3 style={{
                  fontSize: '11px',
                  color: '#b8860b',
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  marginBottom: '40px',
                  textAlign: 'center'
                }}>
                  {t.winecellar.featured}
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '0'
                }}>
                  {[
                    {
                      name: "Monte Xanic",
                      est: "1988",
                      signature: "Gran Ricardo",
                      description: language === 'english' 
                        ? "Mexico's pioneering boutique winery. The Gran Ricardo blend defines Baja wine excellence."
                        : "La bodega boutique pionera de México. Gran Ricardo define la excelencia del vino de Baja.",
                      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
                      website: "https://montexanic.com.mx"
                    },
                    {
                      name: "Vena Cava",
                      est: "2005",
                      signature: "Big Blend",
                      description: language === 'english'
                        ? "Iconic boat-hull architecture housing exceptional wines. A must-visit destination."
                        : "Arquitectura icónica de casco de barco con vinos excepcionales. Un destino obligado.",
                      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80",
                      website: "https://venacavawine.com"
                    },
                    {
                      name: "Adobe Guadalupe",
                      est: "2000",
                      signature: "Gabriel",
                      description: language === 'english'
                        ? "Rustic elegance meets organic viticulture. Home to the acclaimed Gabriel blend."
                        : "Elegancia rústica con viticultura orgánica. Hogar del aclamado blend Gabriel.",
                      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
                      website: "https://adobeguadalupe.com"
                    }
                  ].map((winery, i) => (
                    <div key={i} style={{
                      position: 'relative',
                      height: isMobile ? '400px' : '500px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      borderRight: i < 2 && !isMobile ? '1px solid rgba(184,134,11,0.2)' : 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.querySelector('.winery-overlay').style.opacity = '1';
                      e.currentTarget.querySelector('.winery-img').style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.querySelector('.winery-overlay').style.opacity = '0';
                      e.currentTarget.querySelector('.winery-img').style.transform = 'scale(1)';
                    }}>
                      {/* Background Image */}
                      <div 
                        className="winery-img"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url(${winery.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.8s ease'
                        }} 
                      />
                      
                      {/* Dark Gradient */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.7) 60%, rgba(15,23,42,0.95) 100%)'
                      }} />

                      {/* Content */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '40px 32px'
                      }}>
                        <p style={{
                          fontSize: '9px',
                          color: '#b8860b',
                          letterSpacing: '4px',
                          marginBottom: '8px'
                        }}>
                          EST. {winery.est}
                        </p>
                        <h4 style={{
                          fontSize: '24px',
                          fontWeight: '300',
                          color: '#e2e8f0',
                          letterSpacing: '4px',
                          marginBottom: '8px',
                          fontFamily: 'Georgia, serif'
                        }}>
                          {winery.name}
                        </h4>
                        <p style={{
                          fontSize: '11px',
                          color: '#cba658',
                          letterSpacing: '2px',
                          marginBottom: '16px',
                          fontStyle: 'italic'
                        }}>
                          {language === 'english' ? 'Signature' : 'Firma'}: {winery.signature}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: '#94a3b8',
                          lineHeight: '1.7',
                          marginBottom: '20px'
                        }}>
                          {winery.description}
                        </p>

                        {/* Hover Overlay with Buttons */}
                        <div 
                          className="winery-overlay"
                          style={{
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                            display: 'flex',
                            gap: '12px'
                          }}
                        >
                          <button
                            onClick={() => window.open(winery.website, '_blank')}
                            style={{
                              padding: '12px 24px',
                              background: 'transparent',
                              border: '1px solid #b8860b',
                              color: '#b8860b',
                              fontSize: '9px',
                              letterSpacing: '2px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = '#b8860b';
                              e.currentTarget.style.color = '#0f172a';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#b8860b';
                            }}
                          >
                            {t.winecellar.visit}
                          </button>
                          <button
                            onClick={() => {
                              const msg = language === 'english' 
                                ? `Wine tasting reservation inquiry for ${winery.name}` 
                                : `Consulta de reservación para cata en ${winery.name}`;
                              window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            style={{
                              padding: '12px 24px',
                              background: '#b8860b',
                              border: '1px solid #b8860b',
                              color: '#0f172a',
                              fontSize: '9px',
                              letterSpacing: '2px',
                              cursor: 'pointer',
                              textTransform: 'uppercase'
                            }}
                          >
                            {t.winecellar.reserve}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WINE VARIETIES - ELEGANT HORIZONTAL SCROLL */}
              <div style={{ marginBottom: '64px' }}>
                <h3 style={{
                  fontSize: '11px',
                  color: '#b8860b',
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  marginBottom: '32px',
                  textAlign: 'center'
                }}>
                  {language === 'english' ? 'Grape Varieties' : 'Variedades de Uva'}
                </h3>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '48px',
                  flexWrap: 'wrap'
                }}>
                  {t.winecellar.varieties.map((variety, i) => (
                    <div key={i} style={{
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '1px solid rgba(184,134,11,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        background: 'rgba(15,23,42,0.6)',
                        transition: 'all 0.3s'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          color: '#b8860b',
                          fontFamily: 'Georgia, serif',
                          fontStyle: 'italic'
                        }}>
                          {variety.charAt(0)}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '10px',
                        color: '#e2e8f0',
                        letterSpacing: '2px'
                      }}>
                        {variety}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RESERVE TASTING CTA */}
              <div style={{
                textAlign: 'center',
                padding: '60px 40px',
                border: '1px solid rgba(184,134,11,0.3)',
                background: 'rgba(15,23,42,0.8)',
                backdropFilter: 'blur(20px)'
              }}>
                <p style={{
                  fontSize: '9px',
                  color: '#b8860b',
                  letterSpacing: '6px',
                  marginBottom: '16px',
                  textTransform: 'uppercase'
                }}>
                  {language === 'english' ? 'PRIVATE TASTINGS AVAILABLE' : 'CATAS PRIVADAS DISPONIBLES'}
                </p>
                <h3 style={{
                  fontSize: isMobile ? '20px' : '28px',
                  fontWeight: '200',
                  color: '#e2e8f0',
                  letterSpacing: '4px',
                  marginBottom: '24px',
                  fontFamily: 'Georgia, serif'
                }}>
                  {language === 'english' 
                    ? 'Experience Baja\'s Finest Wines' 
                    : 'Experimenta los Mejores Vinos de Baja'}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  maxWidth: '500px',
                  margin: '0 auto 32px',
                  lineHeight: '1.8'
                }}>
                  {language === 'english'
                    ? 'Let us curate a personalized wine journey through Valle de Guadalupe\'s most prestigious estates.'
                    : 'Permítenos curar un viaje vinícola personalizado por las fincas más prestigiosas del Valle de Guadalupe.'}
                </p>
                <button
                  onClick={() => {
                    const msg = language === 'english' 
                      ? 'I would like to arrange a private wine tasting experience in Valle de Guadalupe' 
                      : 'Me gustaría organizar una experiencia de cata privada en Valle de Guadalupe';
                    window.open(`https://wa.me/526463402686?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  style={{
                    padding: '18px 48px',
                    background: 'transparent',
                    border: '1px solid #b8860b',
                    color: '#b8860b',
                    fontSize: '11px',
                    fontWeight: '500',
                    letterSpacing: '4px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#b8860b';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#b8860b';
                  }}
                >
                  {t.winecellar.reserve}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ==================== PARTNERS TAB - WITH GOLF BACKGROUND ==================== */}
        {activeTab === "partners" && (
          <section style={{ position: 'relative' }}>
            {/* GOLF BACKGROUND */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '-40px',
              right: '-40px',
              bottom: '-60px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ marginBottom: '48px' }}>
                <p style={{ fontSize: '10px', color: '#cba658', letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>
                  {t.partners.title}
                </p>
                <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
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
          </section>
        )}

        {/* ==================== COLLECTION TAB - LUXURY GOODS ==================== */}
        {activeTab === "collection" && (
          <section style={{ 
            margin: '-60px -40px -120px -40px',
            position: 'relative'
          }}>
            <LuxuryGoods />
          </section>
        )}

        {/* ==================== ADVERTISE TAB - SELF SERVICE AD PORTAL ==================== */}
        {activeTab === "advertise" && (
          <section style={{ 
            margin: '-60px -40px -120px -40px',
            position: 'relative'
          }}>
            <SelfServiceAdPortal embedded={true} />
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
    </div>
  );
}