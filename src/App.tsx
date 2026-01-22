import { useState, useEffect, useRef } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import './App.css'

// 로고 이미지
import kaiLogo from './assets/4.png'
import dunamuLogo from './assets/2.png'

// 오드그라피 & 휴먼밸런스 에셋
import odgraphyLogoStart from './assets/odgraphy.svg'
import odgraphyLogoBottom from './assets/odgraphy2.svg'
import odgraphyLogoSmall from './assets/odgraphy3.svg'
import odgraphyBg from './assets/odgrapy4.png'

import humanbLogoStart from './assets/hum.svg'
import humanbLogoSmall from './assets/hum1.svg'
import humanbBgNone from './assets/hum3.png'
import humanbLogoBg from './assets/hum2.svg'

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
  '칠 바이브': [
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
  question: '오늘 당신의\n피부& 바디 컨디션은 어떤가요?',
  optionA: '“몸이 무겁고 순환이 안 되는 느낌이에요.”',
  optionB: '“피부도 마음도 예민하고 회복이 필요해요.”',
  children: {
    A: {
      id: 'performance-q2',
      question: '지금 가장 크게 느껴지는\n고민은 무엇인가요?',
      optionA: '“몸이 퉁퉁 붓고 단단하게 뭉친 느낌이에요.”',
      optionB: '“머리가 무겁고 몸이 답답한 느낌이에요.”',
      children: {
        A: {
          id: 'performance-a-q3',
          question: '오늘 관리에서 가장 집중하고 싶은\n포인트는 무엇인가요?',
          optionA: '“라인 정리! 붓기를 빼고\n가볍고 슬림한 느낌을 만들고 싶어요.”',
          optionB: '“컨디션 회복! 맑아지고 개운한\n상태를 만들고 싶어요.”',
          children: {
            A: {
              id: 'performance-a-a-q4',
              question: '아로마 오일이 오늘 관리에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“순환을 깨우고, 따뜻하게 풀리면서\n배출이 잘 되길 원해요.”',
              optionB: '“호흡이 편해지고, 답답함이 풀리면서\n몸이 개운해지길 원해요.”',
              children: {
                A: {
                  id: 'performance-a-a-a-q5',
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
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
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
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
              question: '오늘 관리에서 가장 집중하고 싶은\n포인트는 무엇인가요?',
              optionA: '“라인 정리! 붓기를 빼고\n가볍고 슬림한 느낌을 만들고 싶어요.”',
              optionB: '“컨디션 회복! 맑아지고 개운한\n상태를 만들고 싶어요.”',
              children: {
                A: {
                  id: 'performance-a-b-a-q5',
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
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
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
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
          id: 'performance-q3-b',
          question: '오늘 관리에서 가장 집중하고 싶은\n포인트는 무엇인가요?',
          optionA: '“라인 정리! 붓기를 빼고\n가볍고 슬림한 느낌을 만들고 싶어요.”',
          optionB: '“컨디션 회복! 맑아지고 개운한\n상태를 만들고 싶어요.”',
          children: {
            A: {
              id: 'performance-q4-ba',
              question: '아로마 오일이 오늘 관리에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“순환을 깨우고, 따뜻하게 풀리면서\n배출이 잘 되길 원해요.”',
              optionB: '“호흡이 편해지고, 답답함이 풀리면서\n몸이 개운해지길 원해요.”',
              children: {
                A: {
                  id: 'performance-q5-baa',
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-baa',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-baa',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'performance-q5-bab',
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-bab',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-bab',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
                      }
                    }
                  }
                }
              }
            },
            B: {
              id: 'performance-q4-bb',
              question: '아로마 오일이 오늘 관리에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“순환을 깨우고, 따뜻하게 풀리면서\n배출이 잘 되길 원해요.”',
              optionB: '“호흡이 편해지고, 답답함이 풀리면서\n몸이 개운해지길 원해요.”',
              children: {
                A: {
                  id: 'performance-q5-bba',
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-bba',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-bba',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
                      }
                    }
                  }
                },
                B: {
                  id: 'performance-q5-bbb',
                  question: '오늘 당신을 위한\n최고의 에스테틱 파트너는?',
                  isQuestion5: true,
                  optionA: '뭉친 흐름을 풀고 라인을 깨우는\n[ 퍼펙트 쉐이핑 ]',
                  optionB: '답답함을 정화하고 컨디션을 끌어올리는\n[ 브리쓰 브리즈 ]',
                  children: {
                    A: {
                      id: 'result-perfect-shaping-bbb',
                      result: {
                        name: '퍼펙트 쉐이핑',
                        description: '붓기를 빼고 라인을 정리하는 데 최적화된 블렌드입니다.'
                      }
                    },
                    B: {
                      id: 'result-breathe-breeze-bbb',
                      result: {
                        name: '브리쓰 브리즈',
                        description: '호흡을 깊게 하고 활력을 불어넣는 상쾌한 블렌드입니다.'
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
      question: '지금 당신의\n마음 상태는 무엇인가요?',
      optionA: '“아무것도 하기 싫고 멍해진 ‘방전’ 상태.”',
      optionB: '“작은 자극에도 예민해진 ‘불안’ 상태.”',
      children: {
        A: {
          id: 'mind-tired-q3',
          question: '지금 상태에서 피부와 몸에\n가장 필요한 것은 무엇인가요?',
          optionA: '“자극보다 휴식.\n풀어주고 비워주는 관리가 필요해요.”',
          optionB: '“내게 집중하는 시간.\n채워지고 안정되는 관리가 필요해요.”',
          children: {
            A: {
              id: 'mind-tired-empty-q4',
              question: '아로마 오일이 오늘 관리에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“관리 후에도 깊은 휴식감이\n오래 남았으면 좋겠어요.”',
              optionB: '“자신감과 회복을 주는 관리를 원해요.”',
              children: {
                A: {
                  id: 'mind-tired-empty-breath-q5',
                  question: '당신을 위한\n최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '피부 회복 리듬을 깨우고 안정감을 채우는\n[ 칠 바이브 ]',
                  optionB: '예민해진 피부와 마음을 감싸는\n[ 로즈 엘릭서 ]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-6',
                      result: {
                        name: '칠 바이브',
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
                  question: '당신을 위한\n최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '피부 회복 리듬을 깨우고 안정감을 채우는\n[ 칠 바이브 ]',
                  optionB: '예민해진 피부와 마음을 감싸는\n[ 로즈 엘릭서 ]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-7',
                      result: {
                        name: '칠 바이브',
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
              question: '아로마 오일이 오늘 관리에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“관리 후에도 깊은 휴식감이\n오래 남았으면 좋겠어요.”',
              optionB: '“자신감과 회복을 주는 관리를 원해요.”',
              children: {
                A: {
                  id: 'mind-tired-fill-focus-q5',
                  question: '당신을 위한\n최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '피부 회복 리듬을 깨우고 안정감을 채우는\n[ 칠 바이브 ]',
                  optionB: '예민해진 피부와 마음을 감싸는\n[ 로즈 엘릭서 ]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-8',
                      result: {
                        name: '칠 바이브',
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
                  question: '당신을 위한\n최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '피부 회복 리듬을 깨우고 안정감을 채우는\n[ 칠 바이브 ]',
                  optionB: '예민해진 피부와 마음을 감싸는\n[ 로즈 엘릭서 ]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-9',
                      result: {
                        name: '칠 바이브',
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
          question: '지금 상태에서 피부와 몸에\n가장 필요한 것은 무엇인가요?',
          optionA: '“자극보다 휴식.\n풀어주고 비워주는 관리가 필요해요.”',
          optionB: '“내게 집중하는 시간.\n채워지고 안정되는 관리가 필요해요.”',
          children: {
            A: {
              id: 'mind-anxious-empty-q4',
              question: '아로마 오일이 오늘 관리에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“관리 후에도 깊은 휴식감이\n오래 남았으면 좋겠어요.”',
              optionB: '“자신감과 회복을 주는 관리를 원해요.”',
              children: {
                A: {
                  id: 'mind-anxious-empty-breath-q5',
                  question: '당신을 위한\n최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '피부 회복 리듬을 깨우고 안정감을 채우는\n[ 칠 바이브 ]',
                  optionB: '예민해진 피부와 마음을 감싸는\n[ 로즈 엘릭서 ]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-10',
                      result: {
                        name: '칠 바이브',
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
                  question: '당신을 위한\n최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '피부 회복 리듬을 깨우고 안정감을 채우는\n[ 칠 바이브 ]',
                  optionB: '예민해진 피부와 마음을 감싸는\n[ 로즈 엘릭서 ]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-11',
                      result: {
                        name: '칠 바이브',
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
              question: '"아르마 오일이 당신에게 어떤 도움이 되길 원하나요?"',
              optionA: '"운동 후의 휴식을 더 깊고 평온하게 만들어주길 원해요."',
              optionB: '"운동하는 동안 나만의 자신감을 채우면 좋겠어요."',
              children: {
                A: {
                  id: 'mind-anxious-fill-focus-q5',
                  question: '당신을 위한 최고의 힐링 파트너는?',
                  isQuestion5: true,
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [칠 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-12',
                      result: {
                        name: '칠 바이브',
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
                  optionA: '지친 마음을 위로하고 사랑을 채우는 [칠 바이브]',
                  optionB: '마음의 평온과 감정의 균형을 찾아주는 [로즈 엘릭서]',
                  children: {
                    A: {
                      id: 'result-chill-vibe-13',
                      result: {
                        name: '칠 바이브',
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

const humanbTree: AromaNode = {
  id: 'start',
  question: '오늘 당신의 컨디션은 어떤가요?',
  optionA: '“몸이 무겁고 붓거나 뭉친 느낌이 있어요.”',
  optionB: '“예민하고 지쳐서 회복이 필요한 느낌이에요.”',
  children: {
    A: {
      id: 'hb-body-q2',
      question: '"지금 가장 크게 느껴지는 불편은 무엇인가요?"',
      optionA: '“붓고 뭉치고, 몸이 단단하게 굳은 느낌이에요.”',
      optionB: '“머리가 무겁고, 몸이 답답한 느낌이에요.”',
      children: {
        A: {
          id: 'hb-body-q3',
          question: '오늘 웰니스 세션에서\n가장 원하는 변화는 무엇인가요?',
          optionA: '“뭉침이 이완되고,\n몸이 가벼워지는 느낌을 원해요.”',
          optionB: '“머리까지 맑아지고,\n개운하게 리셋되는 느낌을 원해요.”',
          children: {
            A: {
              id: 'hb-body-q4-a',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“따뜻하게 풀리면서, 몸의 흐름이\n부드럽게 살아나는 느낌이면 좋겠어요.”',
              optionB: '“호흡이 편해지고, 답답함이 풀려\n컨디션이 정돈되는 느낌이면 좋겠어요.”',
              children: {
                A: {
                  id: 'hb-result-perfect',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-breathe',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                }
              }
            },
            B: {
              id: 'hb-body-q4-b',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“따뜻하게 풀리면서, 몸의 흐름이\n부드럽게 살아나는 느낌이면 좋겠어요.”',
              optionB: '“호흡이 편해지고, 답답함이 풀려\n컨디션이 정돈되는 느낌이면 좋겠어요.”',
              children: {
                A: {
                  id: 'hb-result-perfect-2',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-breathe-2',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                }
              }
            }
          }
        },
        B: {
          id: 'hb-body-q3-b',
          question: '오늘 웰니스 세션에서\n가장 원하는 변화는 무엇인가요?',
          optionA: '“뭉침이 이완되고,\n몸이 가벼워지는 느낌을 원해요.”',
          optionB: '“머리까지 맑아지고,\n개운하게 리셋되는 느낌을 원해요.”',
          children: {
            A: {
              id: 'hb-body-q4-c',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“따뜻하게 풀리면서, 몸의 흐름이\n부드럽게 살아나는 느낌이면 좋겠어요.”',
              optionB: '“호흡이 편해지고, 답답함이 풀려\n컨디션이 정돈되는 느낌이면 좋겠어요.”',
              children: {
                A: {
                  id: 'hb-result-perfect-3',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-breathe-3',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                }
              }
            },
            B: {
              id: 'hb-body-q4-d',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“따뜻하게 풀리면서, 몸의 흐름이\n부드럽게 살아나는 느낌이면 좋겠어요.”',
              optionB: '“호흡이 편해지고, 답답함이 풀려\n컨디션이 정돈되는 느낌이면 좋겠어요.”',
              children: {
                A: {
                  id: 'hb-result-perfect-4',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-breathe-4',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '몸의 흐름을 깨우고, 뭉친 긴장을 이완해\n‘가벼움’을 만드는 [ 퍼펙트 쉐이핑 ]',
                  optionB: '호흡과 답답함을 정돈해, 컨디션을\n‘맑게 리셋’하는 [ 브리쓰 브리즈 ]',
                  children: {
                    A: { id: 'r1', result: { name: '퍼펙트 쉐이핑', description: '' } },
                    B: { id: 'r2', result: { name: '브리쓰 브리즈', description: '' } }
                  }
                }
              }
            }
          }
        }
      }
    },
    B: {
      id: 'hb-mind-q2',
      question: '지금 마음 상태는 어떤가요?',
      optionA: '“기운이 없고 멍해진 ‘방전’ 상태예요.”',
      optionB: '“작은 자극에도 예민한 ‘과부하’ 상태예요.”',
      children: {
        A: {
          id: 'hb-mind-q3',
          question: '오늘 웰니스 세션에서\n가장 필요한 것은 무엇인가요?',
          optionA: '“쉬면서 비워지는 회복감(깊은 휴식)이 필요해요.”',
          optionB: '“안정감과 충전감\n(내 페이스로 돌아오는 느낌)이 필요해요.”',
          children: {
            A: {
              id: 'hb-mind-q4-a',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“세션 후에도 편안함이 오래가고,\n잠이 더 잘 왔으면 해요.”',
              optionB: '“마음이 차분해지고,\n예민함이 부드럽게 가라앉았으면 해요.”',
              children: {
                A: {
                  id: 'hb-result-chill',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-rose',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
                  }
                }
              }
            },
            B: {
              id: 'hb-mind-q4-b',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“세션 후에도 편안함이 오래가고,\n잠이 더 잘 왔으면 해요.”',
              optionB: '“마음이 차분해지고,\n예민함이 부드럽게 가라앉았으면 해요.”',
              children: {
                A: {
                  id: 'hb-result-chill-2',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-rose-2',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
                  }
                }
              }
            }
          }
        },
        B: {
          id: 'hb-mind-q3-b',
          question: '오늘 웰니스 세션에서\n가장 필요한 것은 무엇인가요?',
          optionA: '“쉬면서 비워지는 회복감(깊은 휴식)이 필요해요.”',
          optionB: '“안정감과 충전감\n(내 페이스로 돌아오는 느낌)이 필요해요.”',
          children: {
            A: {
              id: 'hb-mind-q4-c',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“세션 후에도 편안함이 오래가고,\n잠이 더 잘 왔으면 해요.”',
              optionB: '“마음이 차분해지고,\n예민함이 부드럽게 가라앉았으면 해요.”',
              children: {
                A: {
                  id: 'hb-result-chill-3',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-rose-3',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
                  }
                }
              }
            },
            B: {
              id: 'hb-mind-q4-d',
              question: '아로마가 오늘의 세션에\n어떤 도움을 주면 좋겠나요?',
              optionA: '“세션 후에도 편안함이 오래가고,\n잠이 더 잘 왔으면 해요.”',
              optionB: '“마음이 차분해지고,\n예민함이 부드럽게 가라앉았으면 해요.”',
              children: {
                A: {
                  id: 'hb-result-chill-4',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
                  }
                },
                B: {
                  id: 'hb-result-rose-4',
                  question: '오늘 컨디션에 맞춘 블렌딩은?',
                  isQuestion5: true,
                  optionA: '신경을 낮추고 깊은 휴식 리듬을 만들어,\n회복감을 오래 남기는 [ 칠 바이브 ]',
                  optionB: '예민해진 마음과 감각을 부드럽게 감싸,\n안정감을 채우는 [ 로즈 엘릭서 ]',
                  children: {
                    A: { id: 'r3', result: { name: '칠 바이브', description: '' } },
                    B: { id: 'r4', result: { name: '로즈 엘릭서', description: '' } }
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
  tree: AromaNode
  // 신규 필드
  welcomeDescription?: string | React.ReactNode
  backgroundImage?: string
  logoBottomImage?: string
  logoSmallImage?: string
  isFullPageWelcome?: boolean
}

function App() {
  const location = useLocation()
  const brandConfig = getBrandConfig()
  const [currentNode, setCurrentNode] = useState<AromaNode>(brandConfig.tree)
  const [showWelcome, setShowWelcome] = useState(true)
  const [path, setPath] = useState<string[]>([])
  const [showResultPage1, setShowResultPage1] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 브랜드 트리 변경 시 노드 초기화
  useEffect(() => {
    setCurrentNode(brandConfig.tree)
    setPath([])
  }, [location.pathname])

  // 경로에 따라 브랜드 설정
  function getBrandConfig(): BrandConfig {
    const pathname = location.pathname
    if (pathname.startsWith('/dunamu')) {
      return {
        logoText: 'Dunamu',
        logoImage: dunamuLogo,
        welcomeTitle: '두니들을 위한',
        welcomeSubtitle: '웰니스 아로마 테스트',
        questionTitle: '두니들을 위한 웰니스 아로마 테스트',
        bgm: bgm1,
        tree: aromaTree
      }
    } else if (pathname.startsWith('/odgraphy')) {
      return {
        logoText: 'OD GRAPHY',
        logoImage: odgraphyLogoStart,
        welcomeTitle: '오늘의 컨디션에 맞는',
        welcomeSubtitle: '아로마를 추천해드립니다',
        welcomeDescription: (
          <>
            간단한 질문으로 몸과 마음의 상태를 점검하고,<br />
            에센셜 오일과 사용 방법을 안내합니다.
          </>
        ),
        questionTitle: '오늘의 컨디션에 맞는 아로마를 추천해드립니다',
        logoSmallImage: odgraphyLogoSmall,
        logoBottomImage: odgraphyLogoBottom,
        backgroundImage: odgraphyBg,
        isFullPageWelcome: true,
        bgm: bgm1,
        tree: aromaTree
      }
    } else if (pathname.startsWith('/humanb')) {
      return {
        logoText: 'HUMAN BALANCE',
        logoImage: humanbLogoStart,
        welcomeTitle: '오늘의 컨디션에 맞는',
        welcomeSubtitle: '아로마를 추천해드립니다',
        welcomeDescription: (
          <>
            간단한 질문으로 오늘의 컨디션을 확인하고,<br />
            나에게 맞는 아로마 블렌딩과 사용 루틴을 안내해드립니다.
          </>
        ),
        questionTitle: '오늘의 컨디션에 맞는 아로마를 추천해드립니다',
        logoSmallImage: humanbLogoSmall,
        logoBottomImage: humanbLogoBg,
        backgroundImage: humanbBgNone,
        isFullPageWelcome: true,
        bgm: bgm1,
        tree: humanbTree
      }
    } else {
      // /alcohol, /kai, 또는 기본 경로
      return {
        logoText: '한국알콜산업 KAI',
        logoImage: kaiLogo,
        welcomeTitle: '한국알콜그룹 임직원들을 위한',
        welcomeSubtitle: '웰니스 아로마 테스트',
        questionTitle: '한국알콜그룹 임직원들을 위한 웰니스 아로마 테스트',
        bgm: bgm1,
        tree: aromaTree
      }
    }
  }


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
      }, 60000) // 5000ms = 5초
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

    let node = brandConfig.tree // Changed from aromaTree to brandConfig.tree
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
    setCurrentNode(brandConfig.tree)
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
    if (brandConfig.isFullPageWelcome) {
      const isHumanb = brandConfig.logoText.includes('HUMAN')
      return (
        <div className={`app full-page-layout ${isHumanb ? 'humanb-layout' : ''}`} style={{ backgroundImage: `url(${brandConfig.backgroundImage})` }}>
          <SoundToggleButton />

          {brandConfig.logoBottomImage && (
            <div className="logo-overlay">
              <img src={brandConfig.logoBottomImage} alt="logo-overlay" />
            </div>
          )}

          <div className="full-page-welcome">
            <div className="welcome-header">
              <img src={brandConfig.logoImage} alt={brandConfig.logoText} className="brand-logo" />
            </div>

            <div className="welcome-divider"></div>

            <div className="welcome-body">
              <div className="wellness-badge">Wellness Assessment</div>
              <h1 className="main-title">
                {brandConfig.welcomeTitle}<br />
                {brandConfig.welcomeSubtitle}
              </h1>
              <p className="sub-description">
                {brandConfig.welcomeDescription}
              </p>
            </div>

            <div className="welcome-footer">
              <button className="btn-start-round" onClick={handleStart}>
                테스트 시작하기
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="app">
        <SoundToggleButton />
        <div className="container">
          <div className="welcome-screen">
            <div className="welcome-content">
              <div className={`logo-placeholder ${brandConfig.logoText.includes('알콜') ? 'kai-placeholder' : ''}`}>
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
    const isChillVibe = currentNode.result.name.includes('칠 바이브') || currentNode.result.name.includes('칠 바이브')
    const isRoseElixir = currentNode.result.name.includes('로즈 엘릭서')
    const ingredients = productIngredients[currentNode.result.name] || []

    return (
      <div className="app app-result-page-1">
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
                  <div className="product-composition-container" onClick={() => setShowResultPage1(false)}>
                    <img
                      src={
                        isPerfectShaping ? perfectShapingDetailImg :
                          isBreatheBreeze ? breatheBreezeDetailImg :
                            isChillVibe ? chillVibeDetailImg :
                              roseElixirDetailImg
                      }
                      alt="제품 구성"
                      className="product-composition-img clickable"
                    />
                    <div className="click-hint">클릭하여 자세히 보기 👆</div>
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

              {/* <button className="btn btn-next-large" onClick={() => setShowResultPage1(false)}>
                자세히 알아보기
              </button> */}
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
    const isChillVibe = currentNode.result.name.includes('칠 바이브') || currentNode.result.name.includes('칠 바이브')
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
              <img src={brandConfig.logoSmallImage || brandConfig.logoImage} alt={brandConfig.logoText} className="logo-small-image" />
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
      <Route path="/odgraphy" element={<App />} />
      <Route path="/odgraphy/*" element={<App />} />
      <Route path="/humanb" element={<App />} />
      <Route path="/humanb/*" element={<App />} />
      <Route path="/alcohol" element={<App />} />
      <Route path="/alcohol/*" element={<App />} />
      <Route path="/kai" element={<App />} />
      <Route path="/kai/*" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  )
}

export default AromaTest
