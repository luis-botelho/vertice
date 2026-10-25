import { CategoryNode } from '../types';

interface CategorySeed {
  id: string;
  name: string;
  code: string;
  keywords?: string[];
  children?: CategorySeed[];
}

const CATEGORY_SEED: CategorySeed[] = [
  {
    id: 'hidraulica',
    name: 'Materiais Hidráulicos',
    code: 'HID',
    keywords: ['hidráulica', 'água', 'encanamento', 'plumbing'],
    children: [
      {
        id: 'hidraulica-agua-fria',
        name: 'Água Fria',
        code: 'AFR',
        keywords: ['água fria', 'pressão', 'predial'],
        children: [
          {
            id: 'hidraulica-agua-fria-tubos-conexoes',
            name: 'Tubos e Conexões',
            code: 'TCX',
            keywords: ['cano', 'canoa', 'tubulação', 'conexão', 'joelho', 'curva', 'luva', 'tê'],
            children: [
              {
                id: 'hidraulica-agua-fria-tubos-conexoes-pvc',
                name: 'Linha PVC',
                code: 'PVC',
                keywords: ['pvc', 'soldável', 'marrom', 'adesivo'],
                children: [
                  {
                    id: 'hidraulica-agua-fria-tubos-conexoes-pvc-tubos',
                    name: 'Tubos Soldáveis',
                    code: 'TUB',
                    keywords: ['tubo', 'barra', 'vara', 'cano', 'soldável', '6 metros'],
                  },
                  {
                    id: 'hidraulica-agua-fria-tubos-conexoes-pvc-conexoes',
                    name: 'Conexões Soldáveis',
                    code: 'CON',
                    keywords: ['conexão', 'joelho', 'curva', 'luva', 'tê', 'bucha', 'redução'],
                  },
                  {
                    id: 'hidraulica-agua-fria-tubos-conexoes-pvc-adaptadores',
                    name: 'Adaptadores e Buchas',
                    code: 'ADP',
                    keywords: ['adaptador', 'bucha', 'redução', 'transição', 'rosca'],
                  },
                ],
              },
              {
                id: 'hidraulica-agua-fria-tubos-conexoes-roscaveis',
                name: 'Conexões Rosqueáveis',
                code: 'ROS',
                keywords: ['rosca', 'ferro', 'latão', 'galvanizado'],
                children: [
                  {
                    id: 'hidraulica-agua-fria-tubos-conexoes-roscaveis-joelhos-tes-luvas',
                    name: 'Joelhos, Tês e Luvas',
                    code: 'JTL',
                    keywords: ['joelho', 'tê', 'luva', 'conexão'],
                  },
                  {
                    id: 'hidraulica-agua-fria-tubos-conexoes-roscaveis-nipples-buchas',
                    name: 'Nipples e Buchas',
                    code: 'NIB',
                    keywords: ['nipple', 'bucha', 'adaptador'],
                  },
                ],
              },
            ],
          },
          {
            id: 'hidraulica-agua-fria-torneiras-registros',
            name: 'Torneiras e Registros',
            code: 'TRG',
            keywords: ['metal', 'metais', 'acabamento', 'ponto de água'],
            children: [
              {
                id: 'hidraulica-agua-fria-torneiras-registros-torneiras',
                name: 'Torneiras',
                code: 'TOR',
                keywords: ['torneira', 'misturador', 'monocomando', 'bica', 'cuba'],
                children: [
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-torneiras-parede',
                    name: 'Torneiras de Parede',
                    code: 'TPA',
                    keywords: ['parede', 'embutir', 'bica'],
                    children: [
                      {
                        id: 'hidraulica-agua-fria-torneiras-registros-torneiras-parede-pvc',
                        name: 'Torneiras de Parede PVC',
                        code: 'TPP',
                        keywords: ['pvc', 'plástico', 'parede', 'jardim'],
                      },
                      {
                        id: 'hidraulica-agua-fria-torneiras-registros-torneiras-parede-metal',
                        name: 'Torneiras de Parede Metálicas',
                        code: 'TPM',
                        keywords: ['metal', 'latão', 'cromado', 'parede'],
                      },
                    ],
                  },
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-torneiras-bancada',
                    name: 'Torneiras de Bancada',
                    code: 'TBA',
                    keywords: ['bancada', 'cuba', 'pia', 'gourmet'],
                    children: [
                      {
                        id: 'hidraulica-agua-fria-torneiras-registros-torneiras-bancada-monocomando',
                        name: 'Monocomando',
                        code: 'MON',
                        keywords: ['monocomando', 'misturador', 'cartucho', 'água quente'],
                      },
                      {
                        id: 'hidraulica-agua-fria-torneiras-registros-torneiras-bancada-bica-alta',
                        name: 'Bica Alta / Gourmet',
                        code: 'BAL',
                        keywords: ['bica alta', 'gourmet', 'cozinha', 'cuba'],
                      },
                      {
                        id: 'hidraulica-agua-fria-torneiras-registros-torneiras-bancada-bica-baixa',
                        name: 'Bica Baixa',
                        code: 'BBA',
                        keywords: ['bica baixa', 'lavatório', 'banheiro'],
                      },
                    ],
                  },
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-torneiras-jardim',
                    name: 'Torneiras de Jardim',
                    code: 'TJA',
                    keywords: ['jardim', 'externa', 'área externa'],
                  },
                ],
              },
              {
                id: 'hidraulica-agua-fria-torneiras-registros-registros',
                name: 'Registros',
                code: 'REG',
                keywords: ['registro', 'válvula', 'fechamento', 'gaveta'],
                children: [
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-registros-pressao',
                    name: 'Registros de Pressão',
                    code: 'RPR',
                    keywords: ['pressão', 'cruzeta', 'c-50', 'acabamento'],
                  },
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-registros-gaveta',
                    name: 'Registros de Gaveta',
                    code: 'RGA',
                    keywords: ['gaveta', 'volante', 'gaveta'],
                  },
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-registros-esfera',
                    name: 'Registros de Esfera',
                    code: 'RES',
                    keywords: ['esfera', 'angular', '1/4 de volta', 'ponto de água'],
                  },
                ],
              },
              {
                id: 'hidraulica-agua-fria-torneiras-registros-valvulas',
                name: 'Válvulas',
                code: 'VAL',
                keywords: ['válvula', 'retenção', 'descarga', 'esfera'],
                children: [
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-valvulas-esfera',
                    name: 'Válvulas de Esfera',
                    code: 'VES',
                    keywords: ['esfera', 'passagem plena'],
                  },
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-valvulas-descarga',
                    name: 'Válvulas de Descarga',
                    code: 'VDE',
                    keywords: ['descarga', 'sanitário', 'acionamento'],
                  },
                  {
                    id: 'hidraulica-agua-fria-torneiras-registros-valvulas-retencao',
                    name: 'Válvulas de Retenção',
                    code: 'VRE',
                    keywords: ['retenção', 'fluxo unidirecional'],
                  },
                ],
              },
              {
                id: 'hidraulica-agua-fria-torneiras-registros-acabamentos',
                name: 'Acabamentos e Espelhos',
                code: 'ACE',
                keywords: ['acabamento', 'espelho', 'cromado', 'metais'],
              },
            ],
          },
          {
            id: 'hidraulica-agua-fria-caixa-acoplada',
            name: 'Caixa Acoplada e Mecanismos',
            code: 'CAM',
            keywords: ['caixa acoplada', 'descarga', 'mecanismo', 'bacia', 'sanitário'],
            children: [
              {
                id: 'hidraulica-agua-fria-caixa-acoplada-mecanismos-descarga',
                name: 'Mecanismos de Descarga',
                code: 'MDE',
                keywords: ['mecanismo', 'descarga', 'duplo acionamento', 'válvula'],
              },
              {
                id: 'hidraulica-agua-fria-caixa-acoplada-torres-entrada',
                name: 'Torres de Entrada',
                code: 'TEN',
                keywords: ['torre', 'entrada', 'boia', 'enchimento'],
              },
              {
                id: 'hidraulica-agua-fria-caixa-acoplada-obturadores-vedacoes',
                name: 'Obturadores e Vedações',
                code: 'OBV',
                keywords: ['obturador', 'vedação', 'silicone', 'reposição'],
              },
            ],
          },
          {
            id: 'hidraulica-agua-fria-chuveiros-duchas',
            name: 'Chuveiros e Duchas',
            code: 'CHD',
            keywords: ['chuveiro', 'ducha', 'banho', 'higiene'],
            children: [
              {
                id: 'hidraulica-agua-fria-chuveiros-duchas-chuveiros',
                name: 'Chuveiros',
                code: 'CHV',
                keywords: ['chuveiro', 'elétrico', 'pressão'],
              },
              {
                id: 'hidraulica-agua-fria-chuveiros-duchas-duchas-higienicas',
                name: 'Duchas Higiênicas',
                code: 'DHI',
                keywords: ['ducha', 'higiene', 'bidê'],
              },
            ],
          },
        ],
      },
      {
        id: 'hidraulica-agua-quente-gas',
        name: 'Água Quente e Gás',
        code: 'AQG',
        keywords: ['água quente', 'gás', 'cpvc', 'ppr', 'cobre'],
        children: [
          {
            id: 'hidraulica-agua-quente-gas-tubos',
            name: 'Tubos CPVC / PPR / Cobre',
            code: 'TCP',
            keywords: ['cpvc', 'ppr', 'cobre', 'termofusão', 'água quente'],
          },
          {
            id: 'hidraulica-agua-quente-gas-conexoes',
            name: 'Conexões e Transições',
            code: 'CTR',
            keywords: ['conexão', 'transição', 'termofusão', 'rosca'],
          },
          {
            id: 'hidraulica-agua-quente-gas-registros',
            name: 'Registros e Válvulas',
            code: 'RVA',
            keywords: ['registro', 'válvula', 'gás', 'água quente'],
          },
        ],
      },
      {
        id: 'hidraulica-esgoto-drenagem',
        name: 'Esgoto e Drenagem',
        code: 'ESG',
        keywords: ['esgoto', 'drenagem', 'efluente', 'ralo'],
        children: [
          {
            id: 'hidraulica-esgoto-drenagem-tubos-conexoes',
            name: 'Tubos e Conexões de Esgoto',
            code: 'TCE',
            keywords: ['tubo', 'conexão', 'esgoto', 'pvc branco'],
          },
          {
            id: 'hidraulica-esgoto-drenagem-caixas-ralos-sifoes',
            name: 'Caixas, Ralos e Sifões',
            code: 'CRS',
            keywords: ['caixa', 'ralo', 'sifão', 'dreno', 'gordura'],
            children: [
              {
                id: 'hidraulica-esgoto-drenagem-caixas-ralos-sifoes-sifoes',
                name: 'Sifões',
                code: 'SIF',
                keywords: ['sifão', 'sanfonado', 'universal', 'fecho hídrico'],
              },
              {
                id: 'hidraulica-esgoto-drenagem-caixas-ralos-sifoes-ralos',
                name: 'Ralos e Grades',
                code: 'RAL',
                keywords: ['ralo', 'grade', 'linear', 'abacaxi'],
              },
              {
                id: 'hidraulica-esgoto-drenagem-caixas-ralos-sifoes-caixas',
                name: 'Caixas Sifonadas',
                code: 'CSF',
                keywords: ['caixa', 'sifonada', 'inspeção'],
              },
            ],
          },
        ],
      },
      {
        id: 'hidraulica-caixas-dagua-reservatorios',
        name: "Caixas d'Água e Reservatórios",
        code: 'CAR',
        keywords: ['caixa d água', 'reservatório', 'cisterna'],
        children: [
          {
            id: 'hidraulica-caixas-dagua-reservatorios-caixas',
            name: "Caixas d'Água",
            code: 'CXA',
            keywords: ['caixa d água', 'polietileno', 'fibra'],
          },
          {
            id: 'hidraulica-caixas-dagua-reservatorios-acessorios',
            name: 'Boias e Acessórios',
            code: 'BOI',
            keywords: ['boia', 'tampa', 'adaptador', 'extravasor'],
          },
        ],
      },
      {
        id: 'hidraulica-bombas-filtros',
        name: 'Bombas e Filtros',
        code: 'BOM',
        keywords: ['bomba', 'filtro', 'pressurizador', 'purificador'],
        children: [
          {
            id: 'hidraulica-bombas-filtros-bombas',
            name: "Bombas d'Água",
            code: 'BMB',
            keywords: ['bomba', 'pressurizador', 'recalque', 'poço'],
          },
          {
            id: 'hidraulica-bombas-filtros-filtros',
            name: 'Filtros e Purificadores',
            code: 'FIL',
            keywords: ['filtro', 'purificador', 'água potável'],
          },
        ],
      },
    ],
  },
  {
    id: 'eletrica',
    name: 'Materiais Elétricos',
    code: 'ELE',
    keywords: ['elétrica', 'energia', 'instalação elétrica'],
    children: [
      {
        id: 'eletrica-condutores-cabos',
        name: 'Condutores e Cabos',
        code: 'CAB',
        keywords: ['cabo', 'fio', 'condutor', 'cobre'],
        children: [
          {
            id: 'eletrica-condutores-cabos-flexiveis',
            name: 'Cabos Flexíveis',
            code: 'CFL',
            keywords: ['flexível', 'cabo', 'fio', '750v', 'antichama'],
          },
          {
            id: 'eletrica-condutores-cabos-rigidos',
            name: 'Cabos Rígidos',
            code: 'CRG',
            keywords: ['rígido', 'cabo', 'fio', 'cobre'],
          },
        ],
      },
      {
        id: 'eletrica-protecao-distribuicao',
        name: 'Proteção e Distribuição',
        code: 'PRT',
        keywords: ['proteção', 'distribuição', 'quadro', 'disjuntor'],
        children: [
          {
            id: 'eletrica-protecao-distribuicao-disjuntores',
            name: 'Disjuntores',
            code: 'DIS',
            keywords: ['disjuntor', 'termomagnético', 'din', 'curva c', 'ampere'],
          },
          {
            id: 'eletrica-protecao-distribuicao-quadros-caixas',
            name: 'Quadros e Caixas',
            code: 'QDC',
            keywords: ['quadro', 'caixa', 'distribuição', 'barramento'],
          },
          {
            id: 'eletrica-protecao-distribuicao-dps',
            name: 'DPS e Proteção contra Surtos',
            code: 'DPS',
            keywords: ['dps', 'surto', 'raio', 'proteção'],
          },
        ],
      },
      {
        id: 'eletrica-instalacao',
        name: 'Instalação Elétrica',
        code: 'INS',
        keywords: ['instalação', 'tomada', 'interruptor', 'conduíte'],
        children: [
          {
            id: 'eletrica-instalacao-tomadas-interruptores',
            name: 'Tomadas e Interruptores',
            code: 'TIN',
            keywords: ['tomada', 'interruptor', 'plug', 'espelho'],
          },
          {
            id: 'eletrica-instalacao-eletrodutos-conduites',
            name: 'Eletrodutos e Conduítes',
            code: 'ELD',
            keywords: ['eletroduto', 'conduíte', 'corrugado', 'pvc'],
          },
          {
            id: 'eletrica-instalacao-conectores-terminais',
            name: 'Conectores e Terminais',
            code: 'CTM',
            keywords: ['conector', 'terminal', 'emenda', 'ferrule'],
          },
        ],
      },
      {
        id: 'eletrica-iluminacao',
        name: 'Iluminação',
        code: 'ILU',
        keywords: ['iluminação', 'luz', 'lâmpada', 'luminária'],
        children: [
          {
            id: 'eletrica-iluminacao-lampadas',
            name: 'Lâmpadas',
            code: 'LAM',
            keywords: ['lâmpada', 'led', 'fluorescente', 'bulbo'],
          },
          {
            id: 'eletrica-iluminacao-luminarias',
            name: 'Luminárias',
            code: 'LUM',
            keywords: ['luminária', 'plafon', 'spot', 'refletor'],
          },
          {
            id: 'eletrica-iluminacao-fitas-led',
            name: 'Fitas LED e Drivers',
            code: 'LED',
            keywords: ['fita led', 'driver', 'rgb', 'temperatura de cor'],
          },
        ],
      },
      {
        id: 'eletrica-automacao',
        name: 'Automação e Smart Home',
        code: 'AUT',
        keywords: ['automação', 'smart home', 'casa inteligente'],
        children: [
          {
            id: 'eletrica-automacao-sensores',
            name: 'Sensores e Presença',
            code: 'SEN',
            keywords: ['sensor', 'presença', 'movimento', 'luminosidade'],
          },
          {
            id: 'eletrica-automacao-interruptores-inteligentes',
            name: 'Interruptores Inteligentes',
            code: 'INT',
            keywords: ['interruptor', 'inteligente', 'wifi', 'smart'],
          },
        ],
      },
    ],
  },
  {
    id: 'ferramentas',
    name: 'Ferramentas e Acessórios',
    code: 'FER',
    keywords: ['ferramenta', 'acessório', 'obra', 'manutenção'],
    children: [
      {
        id: 'ferramentas-manuais',
        name: 'Ferramentas Manuais',
        code: 'MAN',
        keywords: ['manual', 'chave', 'alicate', 'martelo'],
        children: [
          {
            id: 'ferramentas-manuais-chaves',
            name: 'Chaves e Alicates',
            code: 'CHA',
            keywords: ['chave', 'alicate', 'aperto', 'corte'],
          },
          {
            id: 'ferramentas-manuais-medicao',
            name: 'Medição e Traçagem',
            code: 'MED',
            keywords: ['trena', 'nível', 'esquadro', 'medição'],
          },
        ],
      },
      {
        id: 'ferramentas-eletricas',
        name: 'Ferramentas Elétricas',
        code: 'ELT',
        keywords: ['elétrica', 'furadeira', 'serra', 'parafusadeira'],
        children: [
          {
            id: 'ferramentas-eletricas-furadeiras',
            name: 'Furadeiras e Parafusadeiras',
            code: 'FUR',
            keywords: ['furadeira', 'parafusadeira', 'impacto', 'bateria'],
          },
          {
            id: 'ferramentas-eletricas-serras',
            name: 'Serras e Serra Mármore',
            code: 'SER',
            keywords: ['serra', 'mármore', 'circular', 'tico tico'],
          },
        ],
      },
      {
        id: 'ferramentas-abrasivos-corte',
        name: 'Abrasivos e Corte',
        code: 'ABR',
        keywords: ['abrasivo', 'corte', 'disco', 'lixa'],
        children: [
          {
            id: 'ferramentas-abrasivos-corte-discos-corte',
            name: 'Discos de Corte',
            code: 'DCO',
            keywords: ['disco', 'corte', 'inox', 'fino', '4.1/2'],
          },
          {
            id: 'ferramentas-abrasivos-corte-discos-desbaste',
            name: 'Discos de Desbaste',
            code: 'DDE',
            keywords: ['disco', 'desbaste', 'rebarba'],
          },
          {
            id: 'ferramentas-abrasivos-corte-lixas',
            name: 'Lixas e Folhas',
            code: 'LIX',
            keywords: ['lixa', 'folha', 'grão', 'acabamento'],
          },
        ],
      },
      {
        id: 'ferramentas-fixacao-vedacao',
        name: 'Fixação e Vedação',
        code: 'FIX',
        keywords: ['fixação', 'vedação', 'parafuso', 'veda rosca'],
        children: [
          {
            id: 'ferramentas-fixacao-vedacao-parafusos-chumbadores',
            name: 'Parafusos e Chumbadores',
            code: 'PCH',
            keywords: ['parafuso', 'chumbador', 'bucha', 'fixação'],
          },
          {
            id: 'ferramentas-fixacao-vedacao-fitas-vedantes',
            name: 'Fitas e Vedantes',
            code: 'FIT',
            keywords: ['fita', 'veda rosca', 'vedante', 'lacração'],
          },
          {
            id: 'ferramentas-fixacao-vedacao-selantes-adhesivos',
            name: 'Selantes e Adesivos',
            code: 'SEL',
            keywords: ['selante', 'adesivo', 'silicone', 'pu', 'cola'],
          },
        ],
      },
      {
        id: 'ferramentas-epi-seguranca',
        name: 'EPI e Segurança',
        code: 'EPI',
        keywords: ['epi', 'segurança', 'proteção', 'luva'],
        children: [
          {
            id: 'ferramentas-epi-seguranca-protecao-maos',
            name: 'Luvas e Proteção das Mãos',
            code: 'LUV',
            keywords: ['luva', 'proteção', 'mão', 'nitrílica'],
          },
          {
            id: 'ferramentas-epi-seguranca-protecao-facial',
            name: 'Óculos e Protetores Faciais',
            code: 'OCU',
            keywords: ['óculos', 'protetor facial', 'face shield', 'segurança'],
          },
        ],
      },
    ],
  },
  {
    id: 'acabamentos',
    name: 'Acabamentos e Revestimentos',
    code: 'ACA',
    keywords: ['acabamento', 'revestimento', 'construção', 'decoração'],
    children: [
      {
        id: 'acabamentos-revestimentos',
        name: 'Revestimentos Cerâmicos',
        code: 'REV',
        keywords: ['revestimento', 'cerâmica', 'porcelanato'],
        children: [
          {
            id: 'acabamentos-revestimentos-pisos',
            name: 'Pisos Cerâmicos',
            code: 'PIS',
            keywords: ['piso', 'cerâmica', 'porcelanato'],
          },
          {
            id: 'acabamentos-revestimentos-azulejos',
            name: 'Azulejos e Revestimentos de Parede',
            code: 'AZU',
            keywords: ['azulejo', 'parede', 'revestimento'],
          },
        ],
      },
      {
        id: 'acabamentos-pintura',
        name: 'Pintura',
        code: 'PIN',
        keywords: ['pintura', 'tinta', 'verniz', 'cor'],
        children: [
          {
            id: 'acabamentos-pintura-tintas',
            name: 'Tintas e Vernizes',
            code: 'TTA',
            keywords: ['tinta', 'verniz', 'esmalte', 'látex'],
          },
          {
            id: 'acabamentos-pintura-acessorios',
            name: 'Acessórios de Pintura',
            code: 'APN',
            keywords: ['rolo', 'pincel', 'bandeja', 'fita crepe'],
          },
        ],
      },
      {
        id: 'acabamentos-pisos-argamassas',
        name: 'Pisos e Argamassas',
        code: 'PAR',
        keywords: ['argamassa', 'rejunte', 'piso', 'contrapiso'],
        children: [
          {
            id: 'acabamentos-pisos-argamassas-argamassas',
            name: 'Argamassas e Rejunte',
            code: 'ARG',
            keywords: ['argamassa', 'rejunte', 'cimento cola', 'contrapiso'],
          },
          {
            id: 'acabamentos-pisos-argamassas-vinilicos',
            name: 'Pisos Vinílicos e Laminados',
            code: 'PVL',
            keywords: ['vinílico', 'laminado', 'piso', 'madeira'],
          },
        ],
      },
      {
        id: 'acabamentos-loucas-metais',
        name: 'Louças e Metais Sanitários',
        code: 'LMS',
        keywords: ['louça', 'metal', 'sanitário', 'banheiro'],
        children: [
          {
            id: 'acabamentos-loucas-metais-loucas',
            name: 'Louças Sanitárias',
            code: 'LOU',
            keywords: ['vaso', 'bacia', 'lavatório', 'louça'],
          },
          {
            id: 'acabamentos-loucas-metais-cubas',
            name: 'Cubas e Tanques',
            code: 'CUB',
            keywords: ['cuba', 'tanque', 'pia', 'aço inox'],
          },
        ],
      },
    ],
  },
];

const nodes: CategoryNode[] = [];
const childrenByParent = new Map<string | null, CategoryNode[]>();

function flatten(
  seeds: CategorySeed[],
  parentId: string | null,
  level: number,
): CategoryNode[] {
  const flattened: CategoryNode[] = [];

  seeds.forEach((seed) => {
    const node: CategoryNode = {
      id: seed.id,
      parentId,
      name: seed.name,
      slug: seed.id.split('-').slice(-1)[0],
      code: seed.code,
      level,
      keywords: seed.keywords ?? [],
    };

    nodes.push(node);
    flattened.push(node);

    const siblings = childrenByParent.get(parentId) ?? [];
    siblings.push(node);
    childrenByParent.set(parentId, siblings);

    if (seed.children?.length) {
      flattened.push(...flatten(seed.children, seed.id, level + 1));
    }
  });

  return flattened;
}

flatten(CATEGORY_SEED, null, 1);

const categoryById = new Map(nodes.map((node) => [node.id, node]));

const descendantsById = new Map<string, string[]>();

function collectDescendants(id: string): string[] {
  const cached = descendantsById.get(id);
  if (cached) return cached;

  const descendants = [id];
  for (const child of childrenByParent.get(id) ?? []) {
    descendants.push(...collectDescendants(child.id));
  }

  descendantsById.set(id, descendants);
  return descendants;
}

nodes.forEach((node) => collectDescendants(node.id));

export const CATEGORY_NODES = nodes;
export const CATEGORY_BY_ID = categoryById;
export const CATEGORY_CHILDREN_BY_PARENT = childrenByParent;
export const CATEGORY_DESCENDANTS_BY_ID = descendantsById;

export const CATEGORY_OPTIONS = nodes.map((node) => {
  const path = [];
  let current: CategoryNode | undefined = node;
  while (current) {
    path.unshift(current.name);
    current = current.parentId ? categoryById.get(current.parentId) : undefined;
  }

  return {
    id: node.id,
    name: node.name,
    code: node.code,
    level: node.level,
    pathLabel: path.join(' / '),
  };
});

export const DEFAULT_PRODUCT_CATEGORY_ID =
  'hidraulica-agua-fria-tubos-conexoes-pvc-tubos';

const LEGACY_CATEGORY_FALLBACKS: Record<string, string> = {
  'Hidráulica & Conexões': 'hidraulica-agua-fria-tubos-conexoes-pvc-tubos',
  'Metais & Torneiras': 'hidraulica-agua-fria-torneiras-registros-torneiras',
  'Elétrica & Iluminação': 'eletrica-condutores-cabos',
  'Ferramentas & Acessórios': 'ferramentas',
};

const LEGACY_SKU_CATEGORY_IDS: Record<string, string> = {
  'VER-HID-2041': 'hidraulica-agua-fria-caixa-acoplada-mecanismos-descarga',
  'VER-MET-1082': 'hidraulica-agua-fria-torneiras-registros-torneiras-bancada-monocomando',
  'VER-TUB-5012': 'hidraulica-agua-fria-tubos-conexoes-pvc-tubos',
  'VER-REG-3044': 'hidraulica-agua-fria-torneiras-registros-registros-pressao',
  'VER-ELE-7019': 'eletrica-condutores-cabos-flexiveis',
  'VER-ELE-8820': 'eletrica-protecao-distribuicao-disjuntores',
  'VER-HID-1193': 'hidraulica-esgoto-drenagem-caixas-ralos-sifoes-sifoes',
  'VER-FER-4402': 'ferramentas-abrasivos-corte-discos-corte',
  'VER-HID-2035': 'hidraulica-agua-fria-caixa-acoplada-torres-entrada',
  'VER-MET-1088': 'hidraulica-agua-fria-torneiras-registros-registros-esfera',
  'VER-HID-2049': 'hidraulica-agua-fria-caixa-acoplada-obturadores-vedacoes',
};

export function resolveCategoryId(
  categoryIdOrName?: string,
  sku?: string,
): string {
  if (categoryIdOrName && categoryById.has(categoryIdOrName)) {
    return categoryIdOrName;
  }

  if (sku) {
    const bySku = LEGACY_SKU_CATEGORY_IDS[sku.toUpperCase()];
    if (bySku && categoryById.has(bySku)) {
      return bySku;
    }
  }

  if (categoryIdOrName) {
    const fallback = LEGACY_CATEGORY_FALLBACKS[categoryIdOrName];
    if (fallback && categoryById.has(fallback)) {
      return fallback;
    }
  }

  return DEFAULT_PRODUCT_CATEGORY_ID;
}

export function getCategoryById(id?: string): CategoryNode | undefined {
  if (!id) return undefined;
  return categoryById.get(id);
}

export function getCategoryChildren(parentId: string | null): CategoryNode[] {
  return childrenByParent.get(parentId) ?? [];
}

export function getRootCategories(): CategoryNode[] {
  return getCategoryChildren(null);
}

export function getCategoryPath(id?: string): CategoryNode[] {
  if (!id) return [];

  const path: CategoryNode[] = [];
  let current = categoryById.get(id);

  while (current) {
    path.unshift(current);
    current = current.parentId ? categoryById.get(current.parentId) : undefined;
  }

  return path;
}

export function getCategoryPathLabel(id?: string, separator = ' / '): string {
  return getCategoryPath(id)
    .map((node) => node.name)
    .join(separator);
}

export function getDescendantCategoryIds(id?: string): string[] {
  if (!id) return [];
  return descendantsById.get(id) ?? [id];
}

export function isCategoryDescendant(
  candidateId: string,
  ancestorId: string,
): boolean {
  return getDescendantCategoryIds(ancestorId).includes(candidateId);
}

export function getCategorySearchText(id?: string): string {
  return getCategoryPath(id)
    .flatMap((node) => [node.name, ...node.keywords])
    .join(' ');
}
