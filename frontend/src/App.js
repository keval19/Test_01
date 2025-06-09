import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import './App.css';

// Kitchen Model Component
function KitchenModel({ cabinetColor, currentModel }) {
  const models = {
    galley: <GalleyKitchen cabinetColor={cabinetColor} />,
    lshape: <LShapeKitchen cabinetColor={cabinetColor} />,
    island: <IslandKitchen cabinetColor={cabinetColor} />
  };

  return models[currentModel];
}

// Galley Kitchen Layout
function GalleyKitchen({ cabinetColor }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 8]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Left Wall Cabinets */}
      <group position={[-5, 0, 0]}>
        {/* Lower Cabinets */}
        <mesh position={[0, -1, -2]} castShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, -1, 2]} castShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>

        {/* Upper Cabinets */}
        <mesh position={[0, 1.5, -2]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, 1.5, 2]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>

        {/* Countertop */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 5.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Right Wall Cabinets */}
      <group position={[5, 0, 0]}>
        {/* Lower Cabinets */}
        <mesh position={[0, -1, -2]} castShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, -1, 2]} castShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>

        {/* Upper Cabinets */}
        <mesh position={[0, 1.5, -2]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, 1.5, 2]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>

        {/* Countertop */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 5.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Kitchen Island */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[3, 1.5, 1.5]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[3.2, 0.1, 1.7]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>
    </group>
  );
}

// L-Shape Kitchen Layout
function LShapeKitchen({ cabinetColor }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 8]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Main Wall Cabinets */}
      <group position={[-4, 0, 0]}>
        {Array.from({ length: 4 }, (_, i) => (
          <group key={i} position={[0, 0, -3 + i * 1.5]}>
            <mesh position={[0, -1, 0]} castShadow>
              <boxGeometry args={[1, 1.5, 1]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
            <mesh position={[0, 1.5, 0]} castShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 6.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Corner Wall Cabinets */}
      <group position={[0, 0, 3]}>
        {Array.from({ length: 3 }, (_, i) => (
          <group key={i} position={[-2 + i * 1.5, 0, 0]}>
            <mesh position={[0, -1, 0]} castShadow>
              <boxGeometry args={[1, 1.5, 1]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
            <mesh position={[0, 1.5, 0]} castShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[4.7, 0.1, 1.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>
    </group>
  );
}

// Island Kitchen Layout
function IslandKitchen({ cabinetColor }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.1, 10]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Back Wall Cabinets */}
      <group position={[0, 0, -4]}>
        {Array.from({ length: 6 }, (_, i) => (
          <group key={i} position={[-7 + i * 2.5, 0, 0]}>
            <mesh position={[0, -1, 0]} castShadow>
              <boxGeometry args={[1.2, 1.5, 1]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
            <mesh position={[0, 1.5, 0]} castShadow>
              <boxGeometry args={[1.2, 1, 1]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[13, 0.1, 1.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Kitchen Island */}
      <group position={[0, 0, 1]}>
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[4, 1.5, 2]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[4.2, 0.1, 2.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Side Cabinets */}
      <group position={[-5, 0, 2]}>
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[1, 1.5, 1.5]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[1, 1, 1.5]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 1.7]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>
    </group>
  );
}

// Color Picker Component
function ColorPicker({ selectedColor, onColorChange }) {
  const colors = [
    { name: 'Oak Wood', color: '#D2B48C' },
    { name: 'Cherry Wood', color: '#8B4513' },
    { name: 'Maple Wood', color: '#F5DEB3' },
    { name: 'Walnut', color: '#654321' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Black', color: '#2C2C2C' },
    { name: 'Navy Blue', color: '#1e3a8a' },
    { name: 'Forest Green', color: '#166534' },
    { name: 'Cream', color: '#FDF6E3' },
    { name: 'Gray', color: '#6B7280' }
  ];

  return (
    <div className="color-picker">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Cabinet Laminate Colors</h3>
      <div className="grid grid-cols-5 gap-3">
        {colors.map((colorOption) => (
          <button
            key={colorOption.name}
            className={`
              w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-110
              ${selectedColor === colorOption.color 
                ? 'border-blue-500 shadow-lg' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            style={{ backgroundColor: colorOption.color }}
            onClick={() => onColorChange(colorOption.color)}
            title={colorOption.name}
          />
        ))}
      </div>
    </div>
  );
}

// Model Selector Component
function ModelSelector({ currentModel, onModelChange }) {
  const models = [
    { id: 'galley', name: 'Galley Kitchen' },
    { id: 'lshape', name: 'L-Shape Kitchen' },
    { id: 'island', name: 'Island Kitchen' }
  ];

  return (
    <div className="model-selector">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Kitchen Models</h3>
      <div className="flex flex-wrap gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            className={`
              px-4 py-2 rounded-lg transition-all duration-200
              ${currentModel === model.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
            onClick={() => onModelChange(model.id)}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [cabinetColor, setCabinetColor] = useState('#D2B48C'); // Default oak color
  const [currentModel, setCurrentModel] = useState('galley');

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          3D Kitchen Designer
        </h1>
        <p className="text-gray-600 mb-6">
          Explore different kitchen layouts and customize cabinet colors in real-time
        </p>
      </header>

      {/* Main Content */}
      <div className="app-content">
        {/* 3D Viewer */}
        <div className="viewer-container">
          <Canvas
            shadows
            camera={{ position: [8, 5, 8], fov: 60 }}
            className="kitchen-canvas"
          >
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <KitchenModel cabinetColor={cabinetColor} currentModel={currentModel} />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={20}
            />
            <Environment preset="apartment" />
          </Canvas>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel">
          <ModelSelector 
            currentModel={currentModel} 
            onModelChange={setCurrentModel} 
          />
          <ColorPicker 
            selectedColor={cabinetColor} 
            onColorChange={setCabinetColor} 
          />
          
          {/* Instructions */}
          <div className="instructions">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Controls</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• <strong>Rotate:</strong> Click and drag</p>
              <p>• <strong>Zoom:</strong> Mouse wheel</p>
              <p>• <strong>Pan:</strong> Right-click and drag</p>
              <p>• <strong>Colors:</strong> Click any color above</p>
              <p>• <strong>Models:</strong> Switch between kitchen layouts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;