import { useState } from 'react'
import './App.css'

interface AromaNode {
  id: string
  name: string
  description: string
  children?: AromaNode[]
}

const aromaTree: AromaNode = {
  id: 'root',
  name: '아로마 추천',
  description: '당신에게 맞는 아로마를 찾아보세요',
  children: [
    {
      id: 'relax',
      name: '🌸 휴식 & 릴랙스',
      description: '편안하고 차분한 향을 원하시나요?',
      children: [
        {
          id: 'lavender',
          name: '라벤더',
          description: '클래식한 릴랙스 향. 숙면과 스트레스 완화에 도움을 줍니다.'
        },
        {
          id: 'chamomile',
          name: '캐모마일',
          description: '부드럽고 따뜻한 향. 마음의 평화와 안정을 가져다줍니다.'
        },
        {
          id: 'sandalwood',
          name: '샌달우드',
          description: '우디하고 크리미한 향. 명상과 깊은 휴식에 적합합니다.'
        }
      ]
    },
    {
      id: 'energy',
      name: '⚡ 활력 & 집중',
      description: '상쾌하고 활기찬 향을 원하시나요?',
      children: [
        {
          id: 'peppermint',
          name: '페퍼민트',
          description: '시원하고 청량한 향. 정신을 맑게 하고 집중력을 높여줍니다.'
        },
        {
          id: 'rosemary',
          name: '로즈마리',
          description: '허브향의 신선함. 기억력 향상과 두뇌 활성화에 도움을 줍니다.'
        },
        {
          id: 'lemon',
          name: '레몬',
          description: '상큼한 시트러스 향. 기분을 밝게 하고 에너지를 충전합니다.'
        }
      ]
    },
    {
      id: 'mood',
      name: '💝 기분전환 & 행복',
      description: '기분 좋고 향기로운 향을 원하시나요?',
      children: [
        {
          id: 'rose',
          name: '로즈',
          description: '우아하고 로맨틱한 향. 자신감과 긍정적인 에너지를 불어넣습니다.'
        },
        {
          id: 'jasmine',
          name: '자스민',
          description: '달콤하고 이국적인 향. 우울감을 해소하고 행복감을 증진시킵니다.'
        },
        {
          id: 'ylangylang',
          name: '일랑일랑',
          description: '관능적이고 달콤한 향. 스트레스와 불안을 완화시킵니다.'
        }
      ]
    },
    {
      id: 'purify',
      name: '🌿 정화 & 청정',
      description: '깨끗하고 맑은 향을 원하시나요?',
      children: [
        {
          id: 'eucalyptus',
          name: '유칼립투스',
          description: '상쾌하고 시원한 향. 호흡기 건강과 공간 정화에 좋습니다.'
        },
        {
          id: 'tea-tree',
          name: '티트리',
          description: '청결하고 약용적인 향. 항균 효과와 면역력 강화에 도움을 줍니다.'
        },
        {
          id: 'cypress',
          name: '사이프러스',
          description: '우디하고 상쾌한 향. 공기를 정화하고 마음을 안정시킵니다.'
        }
      ]
    }
  ]
}

function App() {
  const [currentPath, setCurrentPath] = useState<AromaNode[]>([aromaTree])

  const currentNode = currentPath[currentPath.length - 1]

  const handleNodeClick = (node: AromaNode) => {
    if (node.children) {
      setCurrentPath([...currentPath, node])
    }
  }

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  const handleReset = () => {
    setCurrentPath([aromaTree])
  }

  const isRoot = currentPath.length === 1
  const isLeaf = !currentNode.children

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🌺 아로마 추천 트리</h1>
          <p className="subtitle">당신의 기분과 목적에 맞는 완벽한 아로마를 찾아보세요</p>
        </header>

        <div className="breadcrumb">
          {currentPath.map((node, index) => (
            <span key={node.id}>
              {index > 0 && <span className="separator"> › </span>}
              <span className={index === currentPath.length - 1 ? 'active' : ''}>
                {node.name}
              </span>
            </span>
          ))}
        </div>

        <div className="content">
          <div className="current-node">
            <h2>{currentNode.name}</h2>
            <p className="description">{currentNode.description}</p>
          </div>

          {currentNode.children && (
            <div className="options">
              {currentNode.children.map((child) => (
                <button
                  key={child.id}
                  className="option-card"
                  onClick={() => handleNodeClick(child)}
                >
                  <h3>{child.name}</h3>
                  <p>{child.description}</p>
                  {child.children && <span className="arrow">→</span>}
                </button>
              ))}
            </div>
          )}

          {isLeaf && (
            <div className="result">
              <div className="result-badge">✨ 추천 아로마 ✨</div>
              <p className="result-text">
                {currentNode.name}는 {currentNode.description}
              </p>
            </div>
          )}
        </div>

        <div className="controls">
          {!isRoot && (
            <button className="btn btn-back" onClick={handleBack}>
              ← 이전
            </button>
          )}
          {!isRoot && (
            <button className="btn btn-reset" onClick={handleReset}>
              🔄 처음으로
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
