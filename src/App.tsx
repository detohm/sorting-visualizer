import React, { useState } from 'react';
import { AlgorithmEnum } from './algorithms/algorithm.interface';
import { animationFrame, animationType } from './algorithms/animation';
import bubbleSort from './algorithms/bubbleSort';
import mergeSort from './algorithms/mergeSort';
import quickSort from './algorithms/quickSort';
import Header from './components/organisms/Header/Header';
import Layout from './components/organisms/Layout/Layout';
import Visualizer from './components/organisms/Visualizer/Visualizer';

// helper for generating randomized elements
const generateElements = (num: number): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.floor(Math.random() * 200) + 20);
  }
  return arr;
}

// helper for calculating animation speed
const animateSpeed = (num: number): number => {
  if (num <= 10) { return 100; }
  if (num > 10 && num <= 25) { return 50; }
  return 1;
};

const App = () => {

  const [currentAlgorithm, setCurrentAlgorithm]
    = useState<AlgorithmEnum>(AlgorithmEnum.MergeSort);
  const handleAlgorithmChange = (algo: AlgorithmEnum) => {
    setCurrentAlgorithm(algo);
    clearVisual();
  };

  const [elements, setElements] = useState<number[]>(generateElements(20));
  const handleNumChange = (num: number) => {
    setElements(generateElements(num));
    clearVisual();
  };

  const [highlightIdx, setHighlightIdx] = useState<number[]>([]);
  const [highlightSecondIdx, setHighlightSecondIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<number[]>([]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const handleStartButtonClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    }

    switch (currentAlgorithm) {
      case AlgorithmEnum.BubbleSort:
        animate(bubbleSort(elements));
        break;
      case AlgorithmEnum.MergeSort:
        animate(mergeSort(elements));
        break;
      case AlgorithmEnum.QuickSort:
        animate(quickSort(elements));
        break;
      default:
        setIsRunning(false);
    }
  }

  const clearVisual = () => {
    setHighlightIdx([]);
    setSortedIdx([]);
  };



  // recursive approach for animating the bars.
  const animate = (animations: animationFrame[]) => {
    if (animations.length === 0) {
      setIsRunning(false);
      setHighlightIdx([]);
      setHighlightSecondIdx([]);

      return;
    }
    let frame: animationFrame = animations[0];
    switch (frame.type) {
      case animationType.Probe:
        setHighlightIdx([frame.idx1!, frame.idx2!]);
        setHighlightSecondIdx([]);
        break;
      case animationType.Swap:
        setHighlightSecondIdx([frame.idx1!, frame.idx2!]);
        break;
      case animationType.ChangeSortedIdx:
        setSortedIdx(frame.sortedIdx!);
        break;
      case animationType.ChangeElements:
        setElements(frame.elements!);
    }
    animations.shift();
    let timer = setTimeout(() => {
      clearTimeout(timer); // preventing memory leak.
      animate(animations);
    }, animateSpeed(elements.length));
  }

  return (
    <Layout>
      <Header
        currentAlgorithm={currentAlgorithm}
        isRunning={isRunning}
        onNumChange={handleNumChange}
        onStartButtonClick={handleStartButtonClick}
        onAlgorithmChange={handleAlgorithmChange} />

      <Visualizer
        currentAlgorithm={currentAlgorithm}
        elements={elements}
        highlightIdx={highlightIdx}
        highlightSecondIdx={highlightSecondIdx}
        sortedIdx={sortedIdx}
      />

    </Layout>
  );
};

export default App;
