"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Typography, Container, Grid, Box, Button, Paper, useMediaQuery, useTheme, Chip } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CalculateIcon from '@mui/icons-material/Calculate';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";
import Link from "next/link";

import ServiceCard from "@/components/ServiceCard";
import CallToAction from "@/components/CallToAction";

// Componente que renderiza sólo en el lado cliente
function BackgroundAnimations() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  // Factor de opacidad ajustado según el tema - reducido para mayor sutileza
  const opacityFactor = theme.palette.mode === 'dark' ? 0.8 : 1.2;
  
  // Array preconfigurado para evitar regeneración en cada renderizado
  // Aumentamos la cantidad de partículas para mejor cobertura en pantalla completa
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    width: 10 + ((i * 213) % 40),
    height: 10 + ((i * 127) % 40),
    opacity: (0.08 + ((i * 31) % 30) / 100) * opacityFactor,
    top: `${(i * 7) % 100}%`,
    left: `${(i * 13) % 100}%`,
    delay: i * 0.3, // Reducimos el delay para que la animación sea más dinámica
    duration: 20 + (i * 3),
  }));
  
  // Aumentamos también la cantidad de líneas
  const lines = Array.from({ length: 12 }).map((_, i) => ({
    width: 80 + ((i * 237) % 120),
    height: 1 + (i % 2),
    opacity: (0.08 + ((i * 19) % 30) / 100) * opacityFactor,
    top: `${(i * 9) % 100}%`,
    left: `${(i * 17) % 100}%`,
    delay: i * 0.5,
    duration: 15 + (i * 4),
  }));
  
  const symbols = ['$', '%', '+', '-', '=', '&'];
  const symbolsData = symbols.map((symbol, i) => ({
    symbol,
    top: `${(i * 15) % 95}%`,
    left: `${(i * 18) % 95}%`,
    delay: i * 3,
    duration: 20 + (i * 5),
    opacity: theme.palette.mode === 'dark' ? 0.15 : 0.25,
  }));
  
  // Colores ajustados según el tema para mejor visibilidad
  const particleColor = theme.palette.mode === 'dark' 
    ? theme.palette.secondary.main 
    : '#ffb6c1'; // Color rosa para las partículas en modo claro
  
  const lineColor = theme.palette.mode === 'dark'
    ? theme.palette.secondary.main
    : '#f5a9bc'; // Color rosa más intenso para las líneas en modo claro
  
  return (
    <>
      {/* Elementos interactivos para el fondo */}
      <Box
        className="particles-container"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        {/* Partículas animadas */}
        {particles.map((particle, index) => (
          <Box
            key={`particle-${index}`}
            className={`particle particle-${index % 4}`}
            sx={{
              position: 'absolute',
              width: particle.width,
              height: particle.height,
              opacity: particle.opacity,
              borderRadius: '50%',
              background: particleColor,
              animation: `float-particle ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              top: particle.top,
              left: particle.left,
              transform: 'scale(0)',
              transformOrigin: 'center center',
            }}
          />
        ))}
        
        {/* Líneas animadas como gráficos */}
        {lines.map((line, index) => (
          <Box
            key={`line-${index}`}
            className={`line line-${index % 3}`}
            sx={{
              position: 'absolute',
              width: line.width,
              height: line.height,
              opacity: line.opacity,
              background: lineColor,
              animation: `float-line ${line.duration}s linear infinite`,
              animationDelay: `${line.delay}s`,
              top: line.top,
              left: line.left,
              transform: 'scale(0) rotate(0deg)',
              transformOrigin: 'center center',
            }}
          />
        ))}
        
        {/* Símbolos de moneda animados */}
        {symbolsData.map((item, index) => (
          <Box
            key={`symbol-${index}`}
            className={`symbol symbol-${index}`}
            sx={{
              position: 'absolute',
              width: 30,
              height: 30,
              opacity: item.opacity,
              fontFamily: 'Arial',
              fontSize: '30px',
              color: theme.palette.mode === 'dark' 
                ? theme.palette.secondary.main 
                : '#ff8fab', // Color rosa más intenso para los símbolos
              animation: `float-symbol ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`,
              top: item.top,
              left: item.left,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            {item.symbol}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const services = [
    {
      title: "Contabilidad Empresarial",
      description: "Gestión contable completa para empresas y pymes, manteniendo tus finanzas organizadas y cumpliendo con los requisitos legales.",
      icon: <CalculateIcon style={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      delay: 1,
    },
    {
      title: "Asesoría Tributaria",
      description: "Optimiza tu carga fiscal y mantente al día con tus obligaciones tributarias mediante estrategias legales y efectivas.",
      icon: <ReceiptLongIcon style={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      delay: 2,
    },
    {
      title: "Planeación Financiera",
      description: "Desarrolla estrategias financieras para el crecimiento y la estabilidad de tu negocio con proyecciones y análisis profesionales.",
      icon: <AttachMoneyIcon style={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      delay: 3,
    },
    {
      title: "Auditorías y Control",
      description: "Revisión y verificación de tus procesos contables para asegurar la precisión y el cumplimiento de normas contables.",
      icon: <MonitorHeartIcon style={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      delay: 4,
    },
  ];

  // Datos de ejemplo para artículos recientes del blog
  const recentPosts = [
    {
      id: 2,
      title: "Consejos para la declaración de renta de personas naturales",
      excerpt: "Guía práctica con los mejores consejos para preparar correctamente tu declaración de renta y evitar sanciones.",
      author: "Alejandra Bertón",
      date: "10 de abril de 2024",
      imageUrl: "/images/blog/declaracion-renta.jpg",
      categories: ["Impuestos", "Personas Naturales"]
    },
    {
      id: 3,
      title: "Novedades en las NIIF para pequeñas y medianas empresas",
      excerpt: "Descubre las últimas actualizaciones en las Normas Internacionales de Información Financiera y cómo implementarlas en tu PYME.",
      author: "Carlos Gómez",
      date: "5 de marzo de 2024",
      imageUrl: "/images/blog/niif-pymes.jpg",
      categories: ["NIIF", "PYMES"]
    },
    {
      id: 5,
      title: "Guía completa sobre el régimen simple de tributación",
      excerpt: "Todo lo que necesitas saber sobre el Régimen Simple: quiénes pueden acogerse, beneficios y obligaciones.",
      author: "María Rodríguez",
      date: "15 de enero de 2024",
      imageUrl: "/images/blog/regimen-simple.jpg",
      categories: ["Impuestos", "Régimen Simple"]
    },
    {
      id: 6,
      title: "Calendario tributario 2024: Fechas clave para tu empresa",
      excerpt: "Mantente al día con todas las fechas importantes del calendario tributario colombiano para evitar multas y sanciones.",
      author: "Alejandra Bertón",
      date: "5 de enero de 2024",
      imageUrl: "/images/blog/calendario-tributario.jpg",
      categories: ["Impuestos", "Calendario Tributario"]
    }
  ];

  return (
    <>
      {/* Video de fondo - Ahora fuera del Container para ocupar toda la pantalla */}
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.85)' 
              : 'rgba(254, 243, 245, 0.85)', // Color rosado muy suave como fondo base
            zIndex: 1,
          }}
        />
        
        {/* Capa adicional con gradiente sutil para mejorar la separación */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, rgba(60, 60, 70, 0.3) 0%, rgba(30, 30, 35, 0.6) 100%)'
              : 'linear-gradient(to bottom, rgba(255, 141, 169, 0.8) 0%, rgba(255, 73, 128, 0.6) 100%)',
            zIndex: 0.5,
            backdropFilter: 'blur(2px)',
          }}
        />
        
        {/* Fondo mejorado */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 30% 40%, rgba(147, 31, 98, 0.3), transparent 50%)'
              : 'radial-gradient(circle at 30% 40%, rgba(236, 165, 190, 0.7), transparent 50%)',
            zIndex: -1,
            opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
          }}
        />
        
        {/* Renderizamos animaciones solo en el cliente */}
        <BackgroundAnimations />
        
        {/* Elementos decorativos para el fondo - ampliados para pantalla completa */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '2%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.mode === 'dark' ? theme.palette.secondary.light : '#f8c1d3'} 0%, transparent 70%)`,
            filter: 'blur(70px)',
            opacity: theme.palette.mode === 'dark' ? 0.25 : 0.35,
            zIndex: 0,
            animation: 'pulse-slow 8s infinite alternate',
          }}
        />
        
        {/* Nuevo elemento decorativo con animación de pulso rosado */}
        <Box
          className="animate-pink-pulse"
          sx={{
            position: 'absolute',
            top: '30%',
            left: '35%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.mode === 'dark' ? 'rgba(240, 107, 149, 0.4)' : 'rgba(255, 73, 128, 0.5)'} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            opacity: theme.palette.mode === 'dark' ? 0.3 : 0.5,
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '2%',
            right: '2%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.mode === 'dark' ? theme.palette.secondary.main : '#ff8da9'} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            opacity: theme.palette.mode === 'dark' ? 0.3 : 0.5,
            zIndex: 0,
            animation: 'pulse-slow 12s infinite alternate-reverse',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            right: '15%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.mode === 'dark' ? theme.palette.secondary.light : '#f06b95'} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            opacity: theme.palette.mode === 'dark' ? 0.2 : 0.4,
            zIndex: 0,
            animation: 'pulse-slow 15s infinite alternate',
          }}
        />
        
        {/* Elemento adicional en la parte inferior izquierda */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.mode === 'dark' ? theme.palette.secondary.light : '#ff4980'} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            opacity: theme.palette.mode === 'dark' ? 0.2 : 0.45,
            zIndex: 0,
            animation: 'pulse-slow 10s infinite alternate',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ py: 0, position: 'relative' }}>
        <Box 
          className="min-h-[calc(100vh-64px)] flex flex-col justify-center relative" 
          sx={{ 
            pt: { xs: 4, md: 4 },
            pb: { xs: 4, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 70px)' },
            boxSizing: 'border-box',
          }}
        >
          {isMobile && (
            <Box className="mb-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    textAlign: 'center',
                    mb: 1,
                    fontSize: { xs: '1.75rem', sm: '2.125rem' }
                  }}
                >
                  Servicios Contables y Tributarios
                </Typography>
              </motion.div>
            </Box>
          )}
          
          <Grid container spacing={isMobile ? 2 : 4} alignItems="center" direction={isMobile ? "column" : "row"}>
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      mb: 2,
                      textShadow: theme.palette.mode === 'dark' 
                        ? '2px 2px 4px rgba(0, 0, 0, 0.5)' 
                        : 'none',
                    }}
                  >
                    Servicios Contables y Tributarios
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      fontWeight: 500,
                      textShadow: theme.palette.mode === 'dark' 
                        ? '1px 1px 2px rgba(0, 0, 0, 0.5)' 
                        : 'none',
                    }}
                  >
                    Alejandra Bertón - Contadora Pública
                  </Typography>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Paper
                      elevation={theme.palette.mode === 'dark' ? 4 : 2}
                      sx={{
                        p: 3,
                        mb: 5,
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(30, 30, 30, 0.8)' 
                          : 'rgba(255, 255, 255, 0.85)',
                        borderRadius: 2,
                        backdropFilter: 'blur(5px)',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'rgba(249, 246, 243, 0.9)' : 'rgba(60, 60, 60, 0.9)',
                          fontWeight: 400,
                          lineHeight: 1.6,
                        }}
                      >
                        Soluciones contables y tributarias personalizadas para empresas y personas naturales.
                        Optimiza tus finanzas con asesoría profesional y nuestro asistente de IA disponible 24/7 para consultas inmediatas.
                      </Typography>
                    </Paper>
                  </motion.div>

                  <Box className="flex flex-wrap gap-4 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<WhatsAppIcon />}
                        sx={{
                          backgroundColor: '#25D366',
                          color: 'white',
                          px: 3,
                          py: 1.25,
                          '&:hover': {
                            backgroundColor: '#22c55e',
                          },
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                            : '0 4px 12px rgba(34, 197, 94, 0.25)',
                          height: '48px'
                        }}
                        onClick={() =>
                          window.open(
                            "https://wa.me/573053004399?text=Hola%20Alejandra%20me%20gustar%C3%ADa%20una%20asesor%C3%ADa%20contigo%20sobre...",
                            "_blank"
                          )
                        }
                      >
                        WhatsApp
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<LinkedInIcon />}
                        sx={{
                          backgroundColor: '#0A66C2',
                          color: 'white',
                          px: 3,
                          py: 1.25,
                          '&:hover': {
                            backgroundColor: '#0a5cb8',
                          },
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                            : '0 4px 12px rgba(10, 102, 194, 0.25)',
                          height: '48px'
                        }}
                        onClick={() =>
                          window.open(
                            "https://www.linkedin.com/in/alejandra-berton/",
                            "_blank"
                          )
                        }
                      >
                        LinkedIn
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<EmailIcon />}
                        sx={{
                          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.main,
                          color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.background.default,
                          px: 3,
                          py: 1.25,
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#f9f6f3' : '#2a2a2a',
                          },
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                            : '0 4px 12px rgba(15, 23, 42, 0.25)',
                          mb: { xs: 3, sm: 0 },
                          height: '48px'
                        }}
                        onClick={() =>
                          (window.location.href =
                            "mailto:alejandraberton@gmail.com?subject=Consulta profesional&body=Hola Alejandra,%0A%0AMe gustaría una asesoría contable sobre...")
                        }
                      >
                        Email
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>
            )}
            
            <Grid item xs={12} md={6} className={isMobile ? "mb-6" : ""}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center"
              >
                <Box 
                  className="relative w-full max-w-md"
                  sx={{
                    zIndex: 2,
                    backdropFilter: 'blur(8px)',
                    height: { xs: '320px', md: '360px' }
                  }}
                >
                  {/* Fondo circular difuminado con colores de marca */}
                  <div className="absolute w-72 h-72 rounded-full -z-10 blur-3xl top-20 left-1/2 transform -translate-x-1/2 opacity-60"
                    style={{ 
                      background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)` 
                    }}
                  ></div>
                  
                  {/* Foto central - versión móvil ligeramente más pequeña */}
                  <Box 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-4 shadow-xl z-20"
                    sx={{ 
                      borderColor: theme.palette.secondary.main,
                      boxShadow: `0 0 30px 10px ${theme.palette.mode === 'dark' ? 'rgba(217, 176, 156, 0.4)' : 'rgba(217, 176, 156, 0.3)'}`,
                      animation: 'pulse 6s infinite ease-in-out'
                    }}
                  >
                    <Image
                      src="/alejandrafoto.jpeg"
                      alt="Alejandra Bertón"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "50% 30%" }}
                      priority
                    />
                  </Box>
                  
                  {/* Card de Contabilidad - Posición superior */}
                  <Box className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 animate-float">
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 2, 0]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut" 
                      }}
                    >
                      <Paper 
                        elevation={theme.palette.mode === 'dark' ? 3 : 2}
                        sx={{
                          p: 1.5,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(30, 30, 30, 0.9)' 
                            : 'rgba(255, 255, 255, 0.9)',
                          borderRadius: 3,
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
                            : '0 4px 20px rgba(0, 0, 0, 0.1)',
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%'
                        }}
                      >
                        <Box 
                          sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(233, 201, 187, 0.1)' : 'rgba(233, 201, 187, 0.2)',
                            borderRadius: '50%',
                            padding: 0.75,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 0.5
                          }}
                        >
                          <CalculateIcon 
                            sx={{ 
                              color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark, 
                              fontSize: '1.5rem'
                            }} 
                          />
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontSize: '0.75rem',
                            textAlign: 'center'
                          }}
                        >
                          Contabilidad
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Box>

                  {/* Card de Asesoría - Posición izquierda */}
                  <Box className="absolute top-1/2 left-12 -translate-y-1/2 w-24 h-24 animate-float-delayed">
                    <motion.div
                      animate={{ 
                        y: [0, -6, 0],
                        rotate: [0, -1, 0]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut",
                        delay: 0.7
                      }}
                    >
                      <Paper 
                        elevation={theme.palette.mode === 'dark' ? 3 : 2}
                        sx={{
                          p: 1.5,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(30, 30, 30, 0.9)' 
                            : 'rgba(255, 255, 255, 0.9)',
                          borderRadius: 3,
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
                            : '0 4px 20px rgba(0, 0, 0, 0.1)',
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%'
                        }}
                      >
                        <Box 
                          sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(233, 201, 187, 0.1)' : 'rgba(233, 201, 187, 0.2)',
                            borderRadius: '50%',
                            padding: 0.75,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 0.5
                          }}
                        >
                          <ReceiptLongIcon 
                            sx={{ 
                              color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark, 
                              fontSize: '1.5rem'
                            }} 
                          />
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontSize: '0.75rem',
                            textAlign: 'center'
                          }}
                        >
                          Tributaria
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Box>

                  {/* Card de Finanzas - Posición derecha */}
                  <Box className="absolute top-1/2 right-12 -translate-y-1/2 w-24 h-24 animate-float-delayed-more">
                    <motion.div
                      animate={{ 
                        y: [0, -7, 0],
                        rotate: [0, 1, 0]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 6.5,
                        ease: "easeInOut",
                        delay: 1.5
                      }}
                    >
                      <Paper 
                        elevation={theme.palette.mode === 'dark' ? 3 : 2}
                        sx={{
                          p: 1.5,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(30, 30, 30, 0.9)' 
                            : 'rgba(255, 255, 255, 0.9)',
                          borderRadius: 3,
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
                            : '0 4px 20px rgba(0, 0, 0, 0.1)',
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%'
                        }}
                      >
                        <Box 
                          sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(233, 201, 187, 0.1)' : 'rgba(233, 201, 187, 0.2)',
                            borderRadius: '50%',
                            padding: 0.75,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 0.5
                          }}
                        >
                          <AttachMoneyIcon 
                            sx={{ 
                              color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark, 
                              fontSize: '1.5rem'
                            }} 
                          />
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontSize: '0.75rem',
                            textAlign: 'center'
                          }}
                        >
                          Finanzas
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Box>

                  {/* Card de Auditoría - Posición inferior */}
                  <Box className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 animate-float-delayed">
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, -1, 0]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 5.5,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      <Paper 
                        elevation={theme.palette.mode === 'dark' ? 3 : 2}
                        sx={{
                          p: 1.5,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(30, 30, 30, 0.9)' 
                            : 'rgba(255, 255, 255, 0.9)',
                          borderRadius: 3,
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
                            : '0 4px 20px rgba(0, 0, 0, 0.1)',
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%'
                        }}
                      >
                        <Box 
                          sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(233, 201, 187, 0.1)' : 'rgba(233, 201, 187, 0.2)',
                            borderRadius: '50%',
                            padding: 0.75,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 0.5
                          }}
                        >
                          <MonitorHeartIcon 
                            sx={{ 
                              color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark, 
                              fontSize: '1.5rem'
                            }} 
                          />
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontSize: '0.75rem',
                            textAlign: 'center'
                          }}
                        >
                          Auditoría
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            {isMobile && (
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      textAlign: 'center',
                      mb: 1
                    }}
                  >
                    Alejandra Bertón - Contadora Pública
                  </Typography>

                  <Typography 
                    variant="body2" 
                    sx={{
                      color: theme.palette.text.secondary,
                      textAlign: 'center',
                      mb: 2,
                      mx: 'auto',
                      maxWidth: '90%'
                    }}
                  >
                    Soluciones contables y tributarias personalizadas con tecnología de IA. 
                    Consulta con nuestro asistente virtual 24/7 o agenda una asesoría personalizada para optimizar tus finanzas.
                  </Typography>

                  <Box className="flex flex-wrap gap-2 justify-center mb-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<WhatsAppIcon />}
                        sx={{
                          backgroundColor: '#25D366',
                          color: 'white',
                          px: 2.5,
                          py: 1,
                          '&:hover': {
                            backgroundColor: '#22c55e',
                          },
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                            : '0 4px 12px rgba(34, 197, 94, 0.25)'
                        }}
                        onClick={() =>
                          window.open(
                            "https://wa.me/573053004399?text=Hola%20Alejandra%20me%20gustar%C3%ADa%20una%20asesor%C3%ADa%20contigo%20sobre...",
                            "_blank"
                          )
                        }
                      >
                        WhatsApp
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<LinkedInIcon />}
                        sx={{
                          backgroundColor: '#0A66C2',
                          color: 'white',
                          px: 2.5,
                          py: 1,
                          '&:hover': {
                            backgroundColor: '#0a5cb8',
                          },
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                            : '0 4px 12px rgba(10, 102, 194, 0.25)'
                        }}
                        onClick={() =>
                          window.open(
                            "https://www.linkedin.com/in/alejandra-berton/",
                            "_blank"
                          )
                        }
                      >
                        LinkedIn
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<EmailIcon />}
                        sx={{
                          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.main,
                          color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.background.default,
                          px: 2.5,
                          py: 1,
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#f9f6f3' : '#2a2a2a',
                          },
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                            : '0 4px 12px rgba(15, 23, 42, 0.25)',
                          mb: { xs: 3, sm: 0 }
                        }}
                        onClick={() =>
                          (window.location.href =
                            "mailto:alejandraberton@gmail.com?subject=Consulta profesional&body=Hola Alejandra,%0A%0AMe gustaría una asesoría contable sobre...")
                        }
                      >
                        Email
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Estadísticas animadas */}
        

        {/* Servicios Section - Cambio a fondo blanco con ajustes para que llegue a los bordes */}
        <Box 
          className="py-12"
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff',
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            mt: 0,
            mb: 4,
            pt: 8
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  component="h2" 
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 3,
                    position: 'relative',
                    display: 'inline-block'
                  }}
                >
                  Mis Servicios
                  <Box 
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '3px',
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: '3px'
                    }}
                  />
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography 
                  variant="body1" 
                  sx={{
                    color: theme.palette.text.secondary,
                    maxWidth: '650px',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  Ofrezco soluciones adaptadas a las necesidades de tu negocio o actividad personal.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 1.5, 
                    mb: 4 
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: 'reverse',
                        delay: i * 0.3
                      }}
                    >
                      <Box 
                        sx={{
                          width: i === 1 ? 40 : 25,
                          height: 5,
                          borderRadius: '10px',
                          backgroundColor: theme.palette.secondary.main,
                          opacity: i === 1 ? 1 : 0.6
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Container>

          <Container maxWidth="lg">
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
              {/* Elementos decorativos animados */}
              <Box sx={{ position: 'absolute', top: -10, left: -100, zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}>
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                      filter: 'blur(20px)'
                    }}
                  />
                </motion.div>
              </Box>
              
              <Box sx={{ position: 'absolute', bottom: -50, right: -80, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 1
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 180,
                      height: 180,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                      filter: 'blur(25px)'
                    }}
                  />
                </motion.div>
              </Box>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Grid 
                  container 
                  spacing={4}
                  sx={{ position: 'relative', zIndex: 1 }}
                >
                  {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <ServiceCard {...service} />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Box>
          </Container>
        </Box>

        {/* Llamada a la acción */}
        <CallToAction />
        
        {/* Sección de FAQ */}
        <Box 
          className="py-12"
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff',
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            py: 10,
            mt: 4,
            mb: 4
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Typography 
                    variant="h3" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 700, 
                      color: theme.palette.primary.main,
                      mb: 2,
                      position: 'relative',
                      display: 'inline-block'
                    }}
                  >
                    Preguntas Frecuentes
                    <Box 
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '3px',
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '3px'
                      }}
                    />
                  </Typography>
                </motion.div>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    maxWidth: '800px', 
                    mx: 'auto',
                    color: theme.palette.text.secondary,
                    mt: 3
                  }}
                >
                  Respuestas a las dudas más comunes sobre nuestros servicios contables
                </Typography>
              </Box>
            </motion.div>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <Paper 
                  elevation={theme.palette.mode === 'dark' ? 3 : 1}
                  sx={{ 
                    p: 4, 
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(40, 40, 40, 0.7)' 
                      : 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {[
                    {
                      question: "¿Qué servicios de contabilidad ofreces para pequeñas empresas?",
                      answer: "Ofrecemos una completa gestión contable que incluye registro de transacciones, conciliaciones bancarias, preparación de estados financieros, y cumplimiento de obligaciones tributarias, adaptados específicamente a las necesidades de pequeñas empresas y emprendedores."
                    },
                    {
                      question: "¿Cómo puedo optimizar mis impuestos legalmente?",
                      answer: "Mediante una planificación fiscal estratégica, analizamos tu situación financiera para identificar deducciones, beneficios fiscales y estrategias de diferimiento que te permitan reducir tu carga impositiva dentro del marco legal."
                    },
                    {
                      question: "¿Con qué frecuencia debo consultar a un contador?",
                      answer: "Recomendamos consultas mensuales para mantener un control efectivo de tus finanzas, aunque la frecuencia puede variar según el tamaño de tu negocio y la complejidad de tus operaciones financieras."
                    },
                    {
                      question: "¿Qué necesito preparar para mi declaración de renta?",
                      answer: "Debes reunir comprobantes de ingresos, gastos deducibles, certificados de retención, extractos bancarios, información sobre activos y pasivos, y documentación de inversiones realizadas durante el año fiscal."
                    }
                  ].map((faq, index) => (
                    <Box key={index} sx={{ mb: index < 3 ? 4 : 0 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
                          mb: 1
                        }}
                      >
                        {faq.question}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
            
            {/* Elementos decorativos animados */}
            <Box sx={{ position: 'absolute', bottom: -30, left: 0, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <Box 
                  sx={{ 
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                    filter: 'blur(30px)'
                  }}
                />
              </motion.div>
            </Box>
            
            <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 1
                }}
              >
                <Box 
                  sx={{ 
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                    filter: 'blur(25px)'
                  }}
                />
              </motion.div>
            </Box>
          </Container>
        </Box>
        
        {/* Sección de artículos recientes del blog */}
        <Box 
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#f8f9fa',
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            mt: 0,
            mb: 4,
            pt: 8,
            pb: 10
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  component="h2" 
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 3,
                    position: 'relative',
                    display: 'inline-block'
                  }}
                >
                  Artículos Recientes
                  <Box 
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '3px',
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: '3px'
                    }}
                  />
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography 
                  variant="body1" 
                  sx={{
                    color: theme.palette.text.secondary,
                    maxWidth: '650px',
                    mx: 'auto',
                    mb: 5
                  }}
                >
                  Conoce los temas más actuales en contabilidad, impuestos y finanzas relevantes para tu negocio o actividad.
                </Typography>
              </motion.div>
            </motion.div>

            <Grid container spacing={4}>
              {recentPosts.map((post, index) => (
                <Grid 
                  item 
                  xs={12} 
                  md={6} 
                  key={post.id}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Paper 
                    elevation={2} 
                    component={motion.div}
                    whileHover={{ 
                      y: -5,
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 10px 25px -8px rgba(0, 0, 0, 0.5)' 
                        : '0 10px 25px -10px rgba(0, 0, 0, 0.3)' 
                    }}
                    sx={{ 
                      borderRadius: '12px',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    {/* Imagen del artículo */}
                    <Link 
                      href={`/blog/${post.id}`}
                      style={{ textDecoration: 'none', display: 'block', position: 'relative' }}
                    >
                      <Box 
                        sx={{ 
                          position: 'relative',
                          width: '100%', 
                          height: '220px',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${post.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'all 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <Box 
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                            height: '50%',
                            pointerEvents: 'none'
                          }}
                        />
                      </Box>
                    </Link>
                    
                    {/* Contenido del artículo */}
                    <Box sx={{ 
                      p: 3, 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      {/* Categorías */}
                      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {post.categories.map((category: string) => (
                          <Chip 
                            key={category} 
                            label={category} 
                            size="small" 
                            variant="outlined"
                            color="primary" 
                            sx={{ 
                              mr: 1, 
                              mb: 1, 
                              borderRadius: '4px',
                              fontWeight: 500,
                              border: '1px solid',
                              borderColor: theme.palette.primary.main
                            }} 
                            component={Link}
                            href={`/blog?category=${encodeURIComponent(category)}`}
                            clickable
                          />
                        ))}
                      </Box>
                      
                      {/* Título */}
                      <Link 
                        href={`/blog/${post.id}`}
                        style={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          display: 'block'
                        }}
                      >
                        <Typography 
                          variant="h5" 
                          component="h3"
                          sx={{ 
                            mb: 2, 
                            fontWeight: 700,
                            fontSize: { xs: '1.25rem', md: '1.35rem' },
                            lineHeight: 1.3,
                            color: theme.palette.text.primary,
                            transition: 'color 0.2s ease',
                            '&:hover': {
                              color: theme.palette.primary.main
                            }
                          }}
                        >
                          {post.title}
                        </Typography>
                      </Link>
                      
                      {/* Extracto */}
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 3,
                          fontSize: '0.95rem',
                          lineHeight: 1.6
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                      
                      <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)' }}>
                        {/* Metadatos: autor y fecha */}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          mb: 3
                        }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center'
                          }}>
                            <PersonIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              {post.author}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {post.date}
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Botón Leer más */}
                        <Button 
                          component={Link}
                          href={`/blog/${post.id}`}
                          variant="contained" 
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                          fullWidth
                          sx={{ 
                            fontWeight: 500,
                            borderRadius: '6px',
                            textTransform: 'none',
                            py: 1,
                            boxShadow: theme.palette.mode === 'dark' ? '0px 3px 8px rgba(0, 0, 0, 0.3)' : '0px 3px 8px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          Leer más
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  component={Link}
                  href="/blog"
                  variant="outlined" 
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    px: 4,
                    py: 1.2,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderWidth: '2px'
                  }}
                >
                  Ver todos los artículos
                </Button>
              </motion.div>
            </Box>
          </Container>
        </Box>
        
        {/* Espacio para el footer */}
        <Box className="h-16"></Box>
      </Container>
    </>
  );
}
