import { useState, useEffect } from 'react'
import './App.css'

interface AromaNode {
  id: string
  question?: string
  optionA?: string
  optionB?: string
  isQuestion5?: boolean
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
  question: '"당신의 컨디션은 어떠신가요?"',
  optionA: '"몸이 무거워 움직이기가 힘들어요."',
  optionB: '"마음이 복잡해요."',
  children: {
    A: {
      id: 'performance-q2',
      question: '오늘 운동을 방해하는 가장 큰 요인은 무엇인가요?',
      optionA: '"몸이 통통 붓고 근육이 꽉 뭉쳐서 둔한 느낌이에요"',
      optionB: '"머리가 띵하고 숨쉬기가 답답해서 집중이 안 돼요"',
      children: {
        A: {
          id: 'performance-a-q3',
          question: '오늘 운동은 어디에 집중하고 싶나요?',
          optionA: '"라인 정리! 붓기를 빼고 슬림한 태를 만들고 싶어요"',
          optionB: '"수행 능력! 지치지 않고 끝까지 집중해서 운동하고 싶어요"',
          children: {
            A: {
              id: 'performance-a-a-q4',
              question: '아로마 오일이 당신의 운동에 어떤 도움이 되길 원하나요?',
              optionA: '"운동 전 웜업 효과를 주고, 땀 배출과 순환 도움을 주길 원해요."',
              optionB: '"호흡 길을 열어 산소 공급을 늘리고, 운동 퍼포먼스에 도움을 주길 원해요."',
              children: {
                A: {
                  id: 'performance-a-a-a-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '퍼펙트 쉐이핑',
                  optionB: '브리쓰 브리즈',
                  children: {
                    A: {
                      id: 'result-perfect-shaping',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'performance-a-a-b-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '퍼펙트 쉐이핑',
                  optionB: '브리쓰 브리즈',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-2',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-2',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                      }
                    }
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
                  id: 'performance-a-b-a-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '퍼펙트 쉐이핑',
                  optionB: '브리쓰 브리즈',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-3',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-3',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'performance-a-b-b-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '퍼펙트 쉐이핑',
                  optionB: '브리쓰 브리즈',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-4',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다. 워밍업 효과로 땀 배출을 촉진하고 순환을 도와줍니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-4',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다. 호흡을 깊게 하고 산소 공급을 늘려 퍼포먼스를 향상시킵니다.'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        B: {
          id: 'body-performance-q3',
          question: '"오늘 운동을 방해하는 가장 큰 요인은?"',
          optionA: '몸이 붓고 근육이 뭉쳐서 둔해요',
          optionB: '머리가 띵하고 숨쉬기가 답답해요',
          children: {
            A: {
              id: 'body-performance-swelling-q4',
              question: '"어떤 도움이 가장 필요한가요?"',
              optionA: '운동 전 워밍업 효과로 순환 도움',
              optionB: '긴장 완화와 스트레칭',
              children: {
                A: {
                  id: 'body-performance-swelling-warming-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '퍼펙트 쉐이핑',
                  optionB: '브리쓰 브리즈',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-5',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-5',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'body-performance-swelling-relax-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '브리쓰 브리즈',
                  optionB: '질 바이브',
                  children: {
                    A: {
                      id: 'result-breathe-breeze-6',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-chill-vibe-4',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    }
                  }
                }
              }
            },
            B: {
              id: 'body-performance-breath-q4',
              question: '"어떤 도움이 가장 필요한가요?"',
              optionA: '호흡 개선과 에너지 충전',
              optionB: '긴장 완화와 안정',
              children: {
                A: {
                  id: 'body-performance-breath-energy-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '브리쓰 브리즈',
                  optionB: '퍼펙트 쉐이핑',
                  children: {
                    A: {
                      id: 'result-breathe-breeze-7',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-perfect-shaping-6',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'body-performance-breath-calm-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '브리쓰 브리즈',
                  optionB: '질 바이브',
                  children: {
                    A: {
                      id: 'result-breathe-breeze-8',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-chill-vibe-5',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    B: {
      id: 'mind-q2',
      question: '"지금 당신의 마음 상태를 표현한다면?"',
      optionA: '모든 게 귀찮고 멍때리고 싶은 \'방전\' 상태',
      optionB: '작은 일에도 예민하고 기복이 심한 \'불안\' 상태',
      children: {
        A: {
          id: 'mind-tired-q3',
          question: '지금 상태에서 가장 필요한 움직임은 무엇인가요?"',
          optionA: '"격한 운동보다는 스트레칭이나 명상으로 "비움"이 필요해요."',
          optionB: '"요가나 필라테스처럼 나에게 온전히 집중하는 "채움"이 필요해요."',
          children: {
            A: {
              id: 'mind-tired-empty-q4',
              question: '"아르마 오일이 당신에게 어떤 도움이 되길 원하나요?"',
              optionA: '"운동 후의 휴식을 더 깊고 평온하게 만들어주길 원해요."',
              optionB: '"운동하는 동안 나만의 자신감을 채우면 좋겠어요."',
              children: {
                A: {
                  id: 'mind-tired-empty-breath-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-6',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-3',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'mind-tired-empty-body-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-7',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-4',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
                      }
                    }
                  }
                }
              }
            },
            B: {
              id: 'mind-tired-fill-q4',
              question: '"어떤 도움이 가장 필요한가요?"',
              optionA: '나에게 집중하며 에너지 채우기',
              optionB: '부드럽게 움직이며 마음 안정',
              children: {
                A: {
                  id: 'mind-tired-fill-focus-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-8',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-5',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'mind-tired-fill-gentle-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-9',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-6',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        B: {
          id: 'mind-anxious-q3',
          question: '"지금 상태에서 가장 필요한 것은?"',
          optionA: '스트레칭이나 명상으로 \'비움\'',
          optionB: '요가나 필라테스로 \'채움\'',
          children: {
            A: {
              id: 'mind-anxious-empty-q4',
              question: '"어떤 도움이 가장 필요한가요?"',
              optionA: '깊은 호흡과 마음 비우기',
              optionB: '몸 풀면서 스트레스 날리기',
              children: {
                A: {
                  id: 'mind-anxious-empty-breath-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-10',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-7',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'mind-anxious-empty-body-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-11',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-8',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
                      }
                    }
                  }
                }
              }
            },
            B: {
              id: 'mind-anxious-fill-q4',
              question: '"어떤 도움이 가장 필요한가요?"',
              optionA: '나에게 집중하며 에너지 채우기',
              optionB: '부드럽게 움직이며 마음 안정',
              children: {
                A: {
                  id: 'mind-anxious-fill-focus-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-12',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-9',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'mind-anxious-fill-gentle-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '질 바이브',
                  optionB: '로즈 엘릭서',
                  children: {
                    A: {
                      id: 'result-chill-vibe-13',
                      result: {
                        name: '질 바이브',
                        description: '깊은 이완과 스트레스 해소를 돕는 진정 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-rose-elixir-10',
                      result: {
                        name: '로즈 엘릭서',
                        description: '마음의 평온과 감정의 균형을 찾아주는 우아한 블렌드입니다.'
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
  }
}

function App() {
  const [currentNode, setCurrentNode] = useState<AromaNode>(aromaTree)
  const [showWelcome, setShowWelcome] = useState(true)
  const [path, setPath] = useState<string[]>([])
  const [showResultPage1, setShowResultPage1] = useState(true)

  // 결과 페이지에서 자동으로 넘기기 제거 (수동으로 다음 버튼 클릭)
  useEffect(() => {
    if (currentNode.result) {
      setShowResultPage1(true)
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
    setShowResultPage1(true)
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
              <div className="logo-placeholder">
                <div>
                  <div className="logo-text">한국알콜산업 KAI</div>
                </div>
              </div>
              <h1 className="welcome-title">한국알콜그룹 임직원들을 위한</h1>
              <h2 className="welcome-subtitle">웰니스 아로마 테스트</h2>
              <p className="welcome-description">
                몸과 마음의 상태에 맞는<br />
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

  // 결과 페이지 1
  if (currentNode.result && showResultPage1) {
    return (
      <div className="app">
        <div className="container">
          <div className="result-screen">
            <div className="result-content">
              <div className="result-header">
                <div className="logo-small">
                  <div className="logo-small-text">한국알콜산업 KAI</div>
                </div>
              </div>
              <h2 className="result-page-title">테스트 결과</h2>
              <div className="result-product-card">
                <div className="product-badge">웰니스 센터</div>
                <div className="product-image-large">
                  <div className="bottle-icon-large">🧴</div>
                </div>
                <h3 className="product-name-large">{currentNode.result.name}</h3>
                <p className="product-tagline">당신을 위한 맞춤 블렌드</p>
              </div>
              <button className="btn btn-next-large" onClick={() => setShowResultPage1(false)}>
                자세히 알아보기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 결과 페이지 2 (자세한 정보)
  if (currentNode.result && !showResultPage1) {
    return (
      <div className="app">
        <div className="container">
          <div className="result-screen">
            <div className="result-content">
              <div className="result-header">
                <div className="logo-small">
                  <div className="logo-small-text">한국알콜산업 KAI</div>
                </div>
              </div>
              <h2 className="result-page-title">자세히 알아보기</h2>
              
              <div className="result-detail-card">
                <div className="detail-header">
                  <div className="detail-product-image">
                    <div className="bottle-icon-small">🧴</div>
                  </div>
                  <div className="detail-header-text">
                    <h3 className="detail-product-name">{currentNode.result.name}</h3>
                    <p className="detail-product-subtitle">웰니스 에센셜 오일</p>
                  </div>
                </div>

                <div className="detail-body">
                  <div className="detail-description">
                    <p>{currentNode.result.description}</p>
                  </div>

                  <div className="detail-benefits">
                    <h4 className="benefits-title">주요 효능</h4>
                    <div className="benefits-grid">
                      <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <span>천연 성분</span>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <span>빠른 흡수</span>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <span>지속 효과</span>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <span>안전한 사용</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-usage">
                    <h4 className="usage-title">사용 방법</h4>
                    <ul className="usage-list">
                      <li>디퓨저에 2-3방울 떨어뜨려 사용</li>
                      <li>캐리어 오일과 섞어 마사지에 활용</li>
                      <li>운동 전후 또는 휴식 시간에 사용</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button className="btn btn-restart-large" onClick={handleReset}>
                처음으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 질문 페이지
  const totalQuestions = 5
  const isQuestion5 = currentNode.isQuestion5 === true
  
  return (
    <div className="app">
      <div className="container">
        <div className="question-screen">
          <div className="question-header">
            <div className="logo-small">
              <div className="logo-small-text">한국알콜산업 KAI</div>
            </div>
          </div>

          <div className="question-title">
            <div className="question-title-text">한국알콜그룹 임직원들을 위한 웰니스 아로마 테스트</div>
            <div className="progress-container">
              {[...Array(totalQuestions)].map((_, index) => (
                <div 
                  key={index} 
                  className={`progress-dot ${index < path.length + 1 ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="question-number-badge">Question {path.length + 1}</div>
          </div>

          <div className={`question-container ${isQuestion5 ? 'question-5-style' : ''}`}>
            <h2 className="question-text">{currentNode.question}</h2>

            <div className={`options-container ${isQuestion5 ? 'options-q5' : ''}`}>
              <button 
                className={`option-button option-a ${isQuestion5 ? 'option-q5' : ''}`}
                onClick={() => handleChoice('A')}
              >
                <span className="option-text">{currentNode.optionA}</span>
              </button>

              <button 
                className={`option-button option-b ${isQuestion5 ? 'option-q5' : ''}`}
                onClick={() => handleChoice('B')}
              >
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
    </div>
  )
}

export default App
