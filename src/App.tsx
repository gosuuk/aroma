import { useState, useEffect, useRef } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import './App.css'

// 로고 이미지
import kaiLogo from './assets/한국알콜산업 로고.svg'
import dunamuLogo from './assets/2.png'

// 오디오 파일
import bgm1 from './assets/1.mp3'

// 제품 이미지
import perfectShapingDetailImg from './assets/Group 101.png'
import breatheBreezeDetailImg from './assets/Group 102.png'
import chillVibeDetailImg from './assets/Group 103.png'
import roseElixirDetailImg from './assets/Group 104.png'

// 인체 이미지
import bodyImagePerfectShaping from './assets/퍼펙트쉐이핑 인체 이미지.svg'
import breatheBreezeBody01 from './assets/브리쓰브리즈 인체 이미지01.svg'
import breatheBreezeBody02 from './assets/브리쓰브리즈_칠바이브 인체 이미지02.svg'
import chillVibeBodyImg from './assets/칠바이브 인체 이미지01.png'
import roseElixirBodyImg from './assets/로즈엘릭서 인체 이미지.svg'

interface Ingredient {
  name: string
  emoji: string
  description?: string
}

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
    ingredients?: Ingredient[]
  }
}

// 제품별 재료 정보
const productIngredients: Record<string, Ingredient[]> = {
  '퍼펙트 쉐이핑': [
    { name: '자몽 오일', emoji: '🍊', description: '신진대사를 촉진하고 체중 관리에 도움을 줍니다.' },
    { name: '주니퍼베리 오일', emoji: '🫐', description: '독소 배출을 촉진하고 체내 저류를 풀어줍니다.' },
    { name: '진저 오일', emoji: '🫚', description: '몸을 따뜻하게 하는 효과가 있어 근육의 긴장을 풀어줍니다.' },
    { name: '펜넬 오일', emoji: '🌿', description: '소화기능을 향상시키고 복부팽만감을 완화하는데 도움을 줍니다.' },
    { name: '바질 오일', emoji: '🌱', description: '스트레스를 줄이고 정신적 피로와 긴장을 풀어줍니다.' }
  ],
  '브리쓰 브리즈': [
    { name: '페퍼민트 오일', emoji: '🌿', description: '호흡기를 개방하고, 상쾌한 느낌을 줍니다.' },
    { name: '로즈마리 오일', emoji: '🍃', description: '집중력을 향상시키고 피로를 줄입니다.' },
    { name: '파인 오일', emoji: '🌲', description: '숲속의 맑은 공기를 연상시키는 향으로 활력을 제공합니다.' }
  ],
  '질 바이브': [
    { name: '라벤더 오일', emoji: '💜', description: '긴장을 풀어주고 안정감을 제공합니다.' },
    { name: '스윗오렌지 오일', emoji: '🍊', description: '긍정적인 컨디션 회복에 도움을 줍니다.' },
    { name: '팔마로사 오일', emoji: '🌿', description: '심신의 균형을 맞추고 일상의 스트레스를 완화합니다.' },
    { name: '베르가못 오일', emoji: '🍈', description: '불안을 줄여 운동후 휴식과 회복을 촉진합니다.' }
  ],
  '로즈 엘릭서': [
    { name: '장미 오일', emoji: '🌹', description: '감정을 안정시키고 자아 존중감을 높입니다.' },
    { name: '로즈제라늄 오일', emoji: '🌺', description: '정서를 안정시키고 긍정적인 마인드를 형성합니다.' },
    { name: '프랑킨센스 오일', emoji: '🪵', description: '명상과 이완에 도움을 줍니다.' },
    { name: '네롤리 오일', emoji: '🌸', description: '심리적 부담을 줄여주고 행복을 줍니다.' },
    { name: '미르 오일', emoji: '🫚', description: '휴식과 재정비 시간에 도움을 줍니다.' }
  ]
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
                  optionA: '뭉친 곳을 녹이고 라인을 살리는 [퍼펙트 쉐이핑]',
                  optionB: '답답함을 뚫고 에너지를 채우는 [브리쓰 브리즈]',
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
                  optionA: '뭉친 곳을 녹이고 라인을 살리는 [퍼펙트 쉐이핑]',
                  optionB: '답답함을 뚫고 에너지를 채우는 [브리쓰 브리즈]',
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
              optionA: '"운동 전 워밍 효과를 주고, 땀 배출과 순환 도움"',
              optionB: '"호흡 길을 열어 산소 공급을 늘리고, 운동 퍼포먼스에 도움"',
              children: {
                A: {
                  id: 'performance-a-b-a-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 곳을 녹이고 라인을 살리는 [퍼펙트 쉐이핑]',
                  optionB: '답답함을 뚫고 에너지를 채우는 [브리쓰 브리즈]',
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
                  optionA: '뭉친 곳을 녹이고 라인을 살리는 [퍼펙트 쉐이핑]',
                  optionB: '답답함을 뚫고 에너지를 채우는 [브리쓰 브리즈]',
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
          optionA: '"몸이 붓고 근육이 뭉쳐서 둔해요"',
          optionB: '"머리가 띵하고 숨쉬기가 답답해요"',
          children: {
            A: {
              id: 'body-performance-swelling-q4',
              question: '"어떤 도움이 가장 필요한가요?"',
              optionA: '"운동 전 워밍업 효과로 순환 도움"',
              optionB: '"긴장 완화와 스트레칭"',
              children: {
                A: {
                  id: 'body-performance-swelling-warming-q5',
                  question: '당신을 위한 최고의 운동 파트너는?',
                  isQuestion5: true,
                  optionA: '"뭉친 곳을 녹이고 라인을 살리는 [퍼펙트 쉐이핑]"',
                  optionB: '"답답함을 뚫고 에너지를 채우는 [브리쓰 브리즈]"',
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
                  optionA: '"복잡한 머리를 식히고 자유를 주눈 [브리쓰 브리즈]"',
                  optionB: '"지친 마음을 위로하고 사랑을 채우는 [질 바이브]"',
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
                  optionA: '복잡한 머리를 식히고 자유를 주눈 [브리쓰 브리즈]',
                  optionB: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
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
                  optionA: '복잡한 머리를 식히고 자유를 주눈 [브리쓰 브리즈]',
                  optionB: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [질 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
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

interface BrandConfig {
  logoText: string
  logoImage: string
  welcomeTitle: string
  welcomeSubtitle: string
  questionTitle: string
  bgm: any
}

function App() {
  const location = useLocation()
  const [currentNode, setCurrentNode] = useState<AromaNode>(aromaTree)
  const [showWelcome, setShowWelcome] = useState(true)
  const [path, setPath] = useState<string[]>([])
  const [showResultPage1, setShowResultPage1] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 경로에 따라 브랜드 설정
  const getBrandConfig = (): BrandConfig => {
    const pathname = location.pathname
    if (pathname.startsWith('/dunamu')) {
      return {
        logoText: 'Dunamu',
        logoImage: dunamuLogo,
        welcomeTitle: '두니들을 위한',
        welcomeSubtitle: '웰니스 아로마 테스트',
        questionTitle: '두니들을 위한 웰니스 아로마 테스트',
        bgm: bgm1
      }
    } else {
      // /alcohol, /kai, 또는 기본 경로
      return {
        logoText: '한국알콜산업 KAI',
        logoImage: kaiLogo,
        welcomeTitle: '한국알콜그룹 임직원들을 위한',
        welcomeSubtitle: '웰니스 아로마 테스트',
        questionTitle: '한국알콜그룹 임직원들을 위한 웰니스 아로마 테스트',
        bgm: bgm1
      }
    }
  }

  const brandConfig = getBrandConfig()

  // BGM 제어
  useEffect(() => {
    if (!showWelcome) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      const audio = new Audio(brandConfig.bgm)
      audio.loop = true
      audio.volume = 0.3
      audioRef.current = audio

      if (!isMuted) {
        audio.play().catch(e => console.log('Audio play blocked:', e))
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [showWelcome, brandConfig.bgm])

  // 뮤트 변경 시 제어
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.log('Audio play blocked:', e))
      }
    }
  }, [isMuted])

  // 효과음 재생 (간단한 비프음)
  const playClickSfx = () => {
    if (isMuted) return
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = context.createOscillator()
    const gain = context.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, context.currentTime)
    gain.gain.setValueAtTime(0.1, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1)
    osc.connect(gain)
    gain.connect(context.destination)
    osc.start()
    osc.stop(context.currentTime + 0.1)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // 제품 이미지 매핑
  const getProductImage = (_productName: string): string => {
    return '' // 모든 제품 이미지를 현재는 빈 값으로 처리 (퍼펙트 쉐이핑은 별도 이미지 사용)
  }  // 결과 페이지에서 자동으로 넘기기 제거 (수동으로 다음 버튼 클릭)
  useEffect(() => {
    if (currentNode.result) {
      setShowResultPage1(true)
    }
  }, [currentNode])

  // 마지막 상세 페이지 진입 시 5초 후 자동 리셋 기능 추가
  useEffect(() => {
    let timer: any
    
    // 결과가 있고, 첫 번째 결과 페이지가 아닐 때 (즉, 두 번째 상세 페이지일 때)
    if (currentNode.result && !showResultPage1) {
      timer = setTimeout(() => {
        handleReset()
      }, 5000) // 5000ms = 5초
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [currentNode, showResultPage1])

  const handleChoice = (choice: 'A' | 'B') => {
    playClickSfx()
    if (currentNode.children && currentNode.children[choice]) {
      setPath([...path, choice])
      setCurrentNode(currentNode.children[choice]!)
    }
  }

  const handleBack = () => {
    playClickSfx()
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
    playClickSfx()
    setCurrentNode(aromaTree)
    setPath([])
    setShowWelcome(true)
    setShowResultPage1(true)
  }

  const handleStart = () => {
    playClickSfx()
    setShowWelcome(false)
  }

  // 사운드 토글 버튼 컴포넌트
  const SoundToggleButton = () => (
    <button className="sound-toggle-btn" onClick={toggleMute} aria-label="사운드 토글">
      {isMuted ? '🔇' : '🔊'}
    </button>
  )

  if (showWelcome) {
    return (
      <div className="app">
        <SoundToggleButton />
        <div className="container">
          <div className="welcome-screen">
            <div className="welcome-content">
              <div className="logo-placeholder">
                <div>
                  <img src={brandConfig.logoImage} alt={brandConfig.logoText} className="logo-image" />
                </div>
              </div>
              <h1 className="welcome-title">{brandConfig.welcomeTitle}</h1>
              <h2 className="welcome-subtitle">{brandConfig.welcomeSubtitle}</h2>
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
    const isPerfectShaping = currentNode.result.name.includes('퍼펙트 쉐이핑')
    const isBreatheBreeze = currentNode.result.name.includes('브리쓰 브리즈')
    const isChillVibe = currentNode.result.name.includes('질 바이브') || currentNode.result.name.includes('칠 바이브')
    const isRoseElixir = currentNode.result.name.includes('로즈 엘릭서')
    const ingredients = productIngredients[currentNode.result.name] || []

    return (
      <div className="app">
        <SoundToggleButton />
        <div className="container">
          <div className="result-screen">
            <div className={(isPerfectShaping || isBreatheBreeze || isChillVibe || isRoseElixir) ? "result-page-1-content" : "result-content-simple"}>
              {isPerfectShaping || isBreatheBreeze || isChillVibe || isRoseElixir ? (
                <>
                  {/* 상단 제목 */}
                  <div className="result-page-1-header">
                    <div className="result-page-1-subtitle">
                      {isPerfectShaping && 'Perfect Shaping'}
                      {isBreatheBreeze && 'Breath Breeze'}
                      {isChillVibe && 'Chill Vibe'}
                      {isRoseElixir && 'Rose Elixir'}
                    </div>
                    <h2 className="result-page-1-title">
                      {isPerfectShaping && '퍼펙트 쉐이핑'}
                      {isBreatheBreeze && '브리쓰 브리즈'}
                      {isChillVibe && '칠 바이브'}
                      {isRoseElixir && '로즈 엘릭서'}
                    </h2>
                    <p className="result-page-1-tagline">
                      {isPerfectShaping && '"무거운 하루를 비워내는 아로마루틴."'}
                      {isBreatheBreeze && '"시원한 숨, 맑은 집중의 아로마루틴."'}
                      {isChillVibe && '"하루의 쉼표, 휴식의 아로마루틴."'}
                      {isRoseElixir && '"강렬한 플로럴 에너지가 주는 마음회복 아로마루틴."'}
                    </p>
                  </div>

                  {/* 중앙 제품 구성 이미지 */}
                  <div className="product-composition-container">
                    <img 
                      src={
                        isPerfectShaping ? perfectShapingDetailImg : 
                        isBreatheBreeze ? breatheBreezeDetailImg : 
                        isChillVibe ? chillVibeDetailImg :
                        roseElixirDetailImg
                      } 
                      alt="제품 구성" 
                      className="product-composition-img" 
                    />
                  </div>

                  {/* 재료별 효능 박스 */}
                  <div className={`ingredient-horizontal-boxes ${isBreatheBreeze ? 'three-cols' : isChillVibe ? 'four-cols' : isRoseElixir ? 'five-cols' : ''}`}>
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-mini-box">
                        <div className="mini-box-title">{ingredient.name}</div>
                        <div className="mini-box-content">
                          {ingredient.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 하단 설명 텍스트 박스 */}
                  <div className="result-description-box">
                    <p>
                      {isPerfectShaping && '퍼펙트 쉐이핑은 운동 전후에 사용하기 적합한 에센셜 오일로, 신진대사를 촉진하고 지방 연소를 돕는 성분이 포함되어 있습니다. 기분을 상쾌하게 하고, 활력을 증진시켜줍니다.'}
                      {isBreatheBreeze && '브리쓰 브리즈는 호흡을 원활하게 하고 에너지를 높여주는 향으로 가득 찬 에센셜 오일입니다. 신선한 향이 주는 상쾌함이 운동 중 집중력을 향상시킵니다.'}
                      {isChillVibe && '칠 바이브는 긴장을 줄이고 마음을 안정시키는 성분들이 포함된 에센셜 오일입니다. 스트레스 완화에 도움을 주며, 정신적인 평화를 제공합니다.'}
                      {isRoseElixir && '로즈 엘릭서는 감정을 진정시키고, 사랑과 자아 존중감을 증진시키는 역할을 합니다. 달콤한 장미 향기는 마음을 편안하게 해줍니다.'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="product-image-only">
                  <img 
                    src={getProductImage(currentNode.result.name)} 
                    alt={currentNode.result.name}
                    className="product-img-full"
                  />
                </div>
              )}
              
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
    const isPerfectShaping = currentNode.result.name.includes('퍼펙트 쉐이핑')
    const isBreatheBreeze = currentNode.result.name.includes('브리쓰 브리즈')
    const isChillVibe = currentNode.result.name.includes('질 바이브') || currentNode.result.name.includes('칠 바이브')
    const isRoseElixir = currentNode.result.name.includes('로즈 엘릭서')

    return (
      <div className="app">
        <SoundToggleButton />
        <div className="container">
          <div className="result-screen">
            <div className="result-page-2-content">
              {/* 도포 방법 */}
              <div className="usage-section-v2">
                <div className="usage-badge-v2">도포 방법</div>
                <p className="usage-text-v2">
                  {isPerfectShaping && (
                    <>
                      손바닥에 소량을 덜어<br />
                      허리, 복부 또는 팔 부위에 마사지합니다.
                    </>
                  )}
                  {isBreatheBreeze && (
                    <>
                      손목에 소량을 발라 손을 비빈 후,<br />
                      손으로 코와 입을 감싸고 깊게 호흡합니다.
                    </>
                  )}
                  {isChillVibe && (
                    <>
                      손목과 목 뒤에 소량을 도포하고 부드럽게<br />
                      마사지하여 깊이 호흡하며 향을 맡아줍니다.
                    </>
                  )}
                  {isRoseElixir && (
                    <>
                      손가락의 끝에 소량을 찍어 심장 부위나 목뒤에<br />
                      가볍게 찍어 대고 깊이 호흡합니다.
                    </>
                  )}
                </p>
              </div>

              {/* 도포 Tip */}
              <div className="usage-section-v2">
                <div className="usage-badge-v2">도포 Tip</div>
                <p className="usage-text-v2">
                  {isPerfectShaping && <>운등 10분 전에 도포하면 좋습니다.</>}
                  {isBreatheBreeze && (
                    <>
                      목 뒤에 소량을 도포해<br />
                      호흡을 더욱 원활하게 할 수 있습니다.
                    </>
                  )}
                  {isChillVibe && (
                    <>
                      운동 전 또는 운동 후에도 사용 가능합니다.
                    </>
                  )}
                  {isRoseElixir && (
                    <>
                      운동 전에 감정 안정과<br />
                      집중력 향상에 효과적입니다.
                    </>
                  )}
                </p>
              </div>

              {/* 인체 이미지 박스 */}
              <div className="body-image-box-v2">
                {isPerfectShaping && (
                  <img src={bodyImagePerfectShaping} alt="적용 부위" className="body-image-v2" />
                )}
                {isBreatheBreeze && (
                  <div className="body-image-side-by-side">
                    <img src={breatheBreezeBody01} alt="적용 부위 앞" className="body-image-v2-half" />
                    <img src={breatheBreezeBody02} alt="적용 부위 뒤" className="body-image-v2-half" />
                  </div>
                )}
                {isChillVibe && (
                  <img src={chillVibeBodyImg} alt="적용 부위" className="body-image-v2" />
                )}
                {isRoseElixir && (
                  <img src={roseElixirBodyImg} alt="적용 부위" className="body-image-v2" />
                )}
              </div>

              {/* 버튼 섹션 */}
              <div className="result-buttons-v2">
                <button className="btn btn-outline-v2" onClick={() => setShowResultPage1(true)}>
                  이전 페이지
                </button>
                <button className="btn btn-dark-v2" onClick={handleReset}>
                  처음으로 돌아가기
                </button>
              </div>

              {/* 푸터 로고 */}
              <div className="result-footer-v2">
                OD GRAPHY × HUMAN BALANCE
              </div>
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
      <SoundToggleButton />
      <div className="container">
        <div className="question-screen">
          <div className="question-header">
            <div className="logo-small">
              <img src={brandConfig.logoImage} alt={brandConfig.logoText} className="logo-small-image" />
            </div>
          </div>

          <div className="question-title">
            <div className="question-title-text">{brandConfig.questionTitle}</div>
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
                <span className="option-text">
                  {currentNode.optionA?.includes('[') ? (
                    <>
                      {currentNode.optionA.split('[')[0]}<br />
                      <span className="product-highlight">[{currentNode.optionA.split('[')[1]}</span>
                    </>
                  ) : currentNode.optionA}
                </span>
              </button>

              <button 
                className={`option-button option-b ${isQuestion5 ? 'option-q5' : ''}`}
                onClick={() => handleChoice('B')}
              >
                <span className="option-text">
                  {currentNode.optionB?.includes('[') ? (
                    <>
                      {currentNode.optionB.split('[')[0]}<br />
                      <span className="product-highlight">[{currentNode.optionB.split('[')[1]}</span>
                    </>
                  ) : currentNode.optionB}
                </span>
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

function AromaTest() {
  return (
    <Routes>
      <Route path="/dunamu" element={<App />} />
      <Route path="/dunamu/*" element={<App />} />
      <Route path="/alcohol" element={<App />} />
      <Route path="/alcohol/*" element={<App />} />
      <Route path="/kai" element={<App />} />
      <Route path="/kai/*" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  )
}

export default AromaTest
