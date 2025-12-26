import { useState, useEffect } from 'react'
import './App.css'

interface AromaNode {
  id: string
  question?: string
  optionA?: string
  optionB?: string
  children?: {
    A?: AromaNode
    B?: AromaNode
  }
  result?: {
    name: string
    description: string
    image?: string
  }
}

const aromaTree: AromaNode = {
  id: 'start',
  question: '오늘 당신의 컨디션은 어떤가요?',
  optionA: '몸이 무거워 움직이기가 힘들어요',
  optionB: '마음이 복잡해요',
  children: {
    A: {
      id: 'performance-q2',
      question: '오늘 운동을 방해하는 가장 큰 요인은 무엇인가요?',
      optionA: '몸이 통통 붓고 근육이 꽉 뭉쳐서 둔한 느낌이에요',
      optionB: '머리가 띵하고 숨쉬기가 답답해서 집중이 안 돼요',
      children: {
        A: {
          id: 'performance-a-q3',
          question: '오늘 운동은 어디에 집중하고 싶나요?',
          optionA: '라인 정리! 붓기를 빼고 슬림한 태를 만들고 싶어요',
          optionB: '수행 능력! 지치지 않고 끝까지 집중해서 운동하고 싶어요',
          children: {
            A: {
              id: 'performance-a-a-q4',
              question: '아로마 오일이 당신의 운동에 어떤 도움이 되길 원하나요?',
              optionA: '운동 전 워밍 효과를 주고, 땀 배출과 순환 도움',
              optionB: '호흡 길을 열어 산소 공급을 늘리고, 운동 퍼포먼스에 도움',
              children: {
                A: {
                  id: 'result-perfect-shaping',
                  result: {
                    name: '퍼펙트 쉐이핑 에센셜 오일',
                    description: '붕친 곳을 녹이고 라인을 살리는 당신을 위한 최고의 운동 파트너입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                  }
                },
                B: {
                  id: 'result-breathe-breeze',
                  result: {
                    name: '브리쓰 브리즈 에센셜 오일',
                    description: '답답함을 풀고 에너지를 채우는 당신을 위한 최고의 운동 파트너입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                  }
                }
              }
            },
            B: {
              id: 'performance-a-b-redirect',
              question: '아로마 오일이 당신의 운동에 어떤 도움이 되길 원하나요?',
              optionA: '운동 전 워밍 효과를 주고, 땀 배출과 순환 도움',
              optionB: '호흡 길을 열어 산소 공급을 늘리고, 운동 퍼포먼스에 도움',
              children: {
                A: {
                  id: 'result-perfect-shaping-2',
                  result: {
                    name: '퍼펙트 쉐이핑 에센셜 오일',
                    description: '붕친 곳을 녹이고 라인을 살리는 당신을 위한 최고의 운동 파트너입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                  }
                },
                B: {
                  id: 'result-breathe-breeze-2',
                  result: {
                    name: '브리쓰 브리즈 에센셜 오일',
                    description: '답답함을 풀고 에너지를 채우는 당신을 위한 최고의 운동 파트너입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                  }
                }
              }
            }
          }
        },
        B: {
          id: 'performance-b-q3',
          question: '오늘 운동은 어디에 집중하고 싶나요?',
          optionA: '라인 정리! 붓기를 빼고 슬림한 태를 만들고 싶어요',
          optionB: '수행 능력! 지치지 않고 끝까지 집중해서 운동하고 싶어요',
          children: {
            A: {
              id: 'performance-b-a-q4',
              question: '아로마 오일이 당신의 운동에 어떤 도움이 되길 원하나요?',
              optionA: '운동 전 워밍 효과를 주고, 땀 배출과 순환 도움',
              optionB: '호흡 길을 열어 산소 공급을 늘리고, 운동 퍼포먼스에 도움',
              children: {
                A: {
                  id: 'result-perfect-shaping-3',
                  result: {
                    name: '퍼펙트 쉐이핑 에센셜 오일',
                    description: '붕친 곳을 녹이고 라인을 살리는 당신을 위한 최고의 운동 파트너입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                  }
                },
                B: {
                  id: 'result-breathe-breeze-3',
                  result: {
                    name: '브리쓰 브리즈 에센셜 오일',
                    description: '답답함을 풀고 에너지를 채우는 당신을 위한 최고의 운동 파트너입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                  }
                }
              }
            },
            B: {
              id: 'performance-b-b-q4',
              question: '아로마 오일이 당신의 운동에 어떤 도움이 되길 원하나요?',
              optionA: '운동 전 워밍 효과를 주고, 땀 배출과 순환 도움',
              optionB: '호흡 길을 열어 산소 공급을 늘리고, 운동 퍼포먼스에 도움',
              children: {
                A: {
                  id: 'result-perfect-shaping-4',
                  result: {
                    name: '퍼펙트 쉐이핑 에센셜 오일',
                    description: '붕친 곳을 녹이고 라인을 살리는 당신을 위한 최고의 운동 파트너입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                  }
                },
                B: {
                  id: 'result-breathe-breeze-4',
                  result: {
                    name: '브리쓰 브리즈 에센셜 오일',
                    description: '답답함을 풀고 에너지를 채우는 당신을 위한 최고의 운동 파트너입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                  }
                }
              }
            }
          }
        }
      }
    },
    B: {
      id: 'mental-q2',
      question: '지금 당신의 마음 상태를 표현한다면?',
      optionA: '모든 게 귀찮고 그냥 멍하니 있고 싶은 \'방전\' 상태',
      optionB: '작은 일에도 예민하고 감정 기복이 심한 \'불안\' 상태',
      children: {
        A: {
          id: 'mental-a-q3',
          question: '지금 상태에서 가장 필요한 움직임은 무엇인가요?',
          optionA: '격한 운동보다는 스트레칭이나 명상으로 \'비움\'이 필요해요',
          optionB: '요가나 필라테스처럼 나에게 온전히 집중하는 \'채움\'이 필요해요',
          children: {
            A: {
              id: 'mental-a-a-q4',
              question: '아로마 오일이 당신에게 어떤 도움이 되길 원하나요?',
              optionA: '운동 후의 휴식을 더 깊고 평온하게 만들어주길 원해요',
              optionB: '운동하는 동안 온전한 평온함을 느끼면 좋겠어요',
              children: {
                A: {
                  id: 'result-chill-vibe',
                  result: {
                    name: '칠 바이브 에센셜 오일',
                    description: '복잡한 머리를 식히고 자유를 주는 당신을 위한 최고의 힐링 파트너입니다. 깊은 휴식과 평온함을 선사합니다.'
                  }
                },
                B: {
                  id: 'result-rose-elixir',
                  result: {
                    name: '로즈 엘릭서 에센셜 오일',
                    description: '지친 마음을 위로하고 사랑을 채우는 당신을 위한 최고의 힐링 파트너입니다. 온전한 평온함과 행복을 가져다줍니다.'
                  }
                }
              }
            },
            B: {
              id: 'mental-a-b-q4',
              question: '아로마 오일이 당신에게 어떤 도움이 되길 원하나요?',
              optionA: '운동 후의 휴식을 더 깊고 평온하게 만들어주길 원해요',
              optionB: '운동하는 동안 온전한 평온함을 느끼면 좋겠어요',
              children: {
                A: {
                  id: 'result-chill-vibe-2',
                  result: {
                    name: '칠 바이브 에센셜 오일',
                    description: '복잡한 머리를 식히고 자유를 주는 당신을 위한 최고의 힐링 파트너입니다. 깊은 휴식과 평온함을 선사합니다.'
                  }
                },
                B: {
                  id: 'result-rose-elixir-2',
                  result: {
                    name: '로즈 엘릭서 에센셜 오일',
                    description: '지친 마음을 위로하고 사랑을 채우는 당신을 위한 최고의 힐링 파트너입니다. 온전한 평온함과 행복을 가져다줍니다.'
                  }
                }
              }
            }
          }
        },
        B: {
          id: 'mental-b-q3',
          question: '지금 상태에서 가장 필요한 움직임은 무엇인가요?',
          optionA: '격한 운동보다는 스트레칭이나 명상으로 \'비움\'이 필요해요',
          optionB: '요가나 필라테스처럼 나에게 온전히 집중하는 \'채움\'이 필요해요',
          children: {
            A: {
              id: 'mental-b-a-q4',
              question: '아로마 오일이 당신에게 어떤 도움이 되길 원하나요?',
              optionA: '운동 후의 휴식을 더 깊고 평온하게 만들어주길 원해요',
              optionB: '운동하는 동안 온전한 평온함을 느끼면 좋겠어요',
              children: {
                A: {
                  id: 'result-chill-vibe-3',
                  result: {
                    name: '칠 바이브 에센셜 오일',
                    description: '복잡한 머리를 식히고 자유를 주는 당신을 위한 최고의 힐링 파트너입니다. 깊은 휴식과 평온함을 선사합니다.'
                  }
                },
                B: {
                  id: 'result-rose-elixir-3',
                  result: {
                    name: '로즈 엘릭서 에센셜 오일',
                    description: '지친 마음을 위로하고 사랑을 채우는 당신을 위한 최고의 힐링 파트너입니다. 온전한 평온함과 행복을 가져다줍니다.'
                  }
                }
              }
            },
            B: {
              id: 'mental-b-b-q4',
              question: '아로마 오일이 당신에게 어떤 도움이 되길 원하나요?',
              optionA: '운동 후의 휴식을 더 깊고 평온하게 만들어주길 원해요',
              optionB: '운동하는 동안 온전한 평온함을 느끼면 좋겠어요',
              children: {
                A: {
                  id: 'result-chill-vibe-4',
                  result: {
                    name: '칠 바이브 에센셜 오일',
                    description: '복잡한 머리를 식히고 자유를 주는 당신을 위한 최고의 힐링 파트너입니다. 깊은 휴식과 평온함을 선사합니다.'
                  }
                },
                B: {
                  id: 'result-rose-elixir-4',
                  result: {
                    name: '로즈 엘릭서 에센셜 오일',
                    description: '지친 마음을 위로하고 사랑을 채우는 당신을 위한 최고의 힐링 파트너입니다. 온전한 평온함과 행복을 가져다줍니다.'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function App() {
  const [currentNode, setCurrentNode] = useState<AromaNode>(aromaTree)
  const [showWelcome, setShowWelcome] = useState(true)
  const [path, setPath] = useState<string[]>([])

  // 결과 페이지에서 5초 후 자동으로 처음으로
  useEffect(() => {
    if (currentNode.result) {
      const timer = setTimeout(() => {
        handleReset()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentNode])

  const handleChoice = (choice: 'A' | 'B') => {
    if (currentNode.children && currentNode.children[choice]) {
      setPath([...path, choice])
      setCurrentNode(currentNode.children[choice]!)
    }
  }

  const handleBack = () => {
    if (path.length === 0) return
    
    const newPath = [...path]
    newPath.pop()
    
    let node = aromaTree
    for (const step of newPath) {
      if (node.children && node.children[step as 'A' | 'B']) {
        node = node.children[step as 'A' | 'B']!
      }
    }
    
    setPath(newPath)
    setCurrentNode(node)
  }

  const handleReset = () => {
    setCurrentNode(aromaTree)
    setPath([])
    setShowWelcome(true)
  }

  const handleStart = () => {
    setShowWelcome(false)
  }

  if (showWelcome) {
    return (
      <div className="app">
        <div className="container">
          <div className="welcome-screen">
            <div className="welcome-content">
              <div className="welcome-icon">🌿</div>
              <h1 className="welcome-title">OH GHAMVI</h1>
              <h2 className="welcome-subtitle">휴먼밸런스 웰니스를 통한</h2>
              <h2 className="welcome-subtitle">아로마 향수 추천해드립니다</h2>
              <p className="welcome-description">
                당신의 몸과 마음의 상태에 맞는<br />
                완벽한 에센셜 오일을 찾아드립니다
              </p>
              <button className="btn btn-start" onClick={handleStart}>
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 결과 페이지
  if (currentNode.result) {
    return (
      <div className="app">
        <div className="container">
          <div className="result-screen">
            <div className="result-content">
              <div className="result-icon">✨</div>
              <h2 className="result-title">당신을 위한 추천</h2>
              <div className="result-product">
                <div className="product-image-placeholder">
                  <div className="bottle-icon">🧴</div>
                </div>
                <h3 className="product-name">{currentNode.result.name}</h3>
                <p className="product-description">{currentNode.result.description}</p>
              </div>
              <div className="result-timer">
                <p>5초 후 자동으로 처음으로 돌아갑니다</p>
              </div>
              <button className="btn btn-restart" onClick={handleReset}>
                처음으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 질문 페이지
  return (
    <div className="app">
      <div className="container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((path.length + 1) / 5) * 100}%` }}></div>
        </div>

        <div className="question-screen">
          <div className="question-number">Q{path.length + 1}.</div>
          <h2 className="question-text">{currentNode.question}</h2>

          <div className="options-container">
            <button 
              className="option-button option-a"
              onClick={() => handleChoice('A')}
            >
              <span className="option-label">A</span>
              <span className="option-text">{currentNode.optionA}</span>
            </button>

            <button 
              className="option-button option-b"
              onClick={() => handleChoice('B')}
            >
              <span className="option-label">B</span>
              <span className="option-text">{currentNode.optionB}</span>
            </button>
          </div>

          {path.length > 0 && (
            <button className="btn btn-back-simple" onClick={handleBack}>
              ← 이전 질문
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
