import React, { useEffect, useMemo } from 'react';
import { CategoryNode, Product } from '../types';
import {
  getCategoryChildren,
  getCategoryPath,
  getDescendantCategoryIds,
} from '../data/categories';

export interface AdvancedFilterValues {
  selectedCategoryId: string | null;
  selectedManufacturer: string;
  selectedApplication: string;
  selectedMaterial: string;
}

interface AdvancedCatalogFiltersProps {
  products: Product[];
  values: AdvancedFilterValues;
  onChange: (patch: Partial<AdvancedFilterValues>) => void;
  onClear: () => void;
}

const LEVEL_LABELS = [
  'Categoria',
  'Tipo',
  'Segmento',
  'Linha',
  'Variação',
  'Detalhe',
];

const selectClassName =
  'w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]';

export const AdvancedCatalogFilters: React.FC<AdvancedCatalogFiltersProps> = ({
  products,
  values,
  onChange,
  onClear,
}) => {
  const selectedPath = useMemo(
    () => getCategoryPath(values.selectedCategoryId ?? undefined),
    [values.selectedCategoryId],
  );

  const categoryLevels = useMemo(() => {
    const levels: Array<{
      label: string;
      options: CategoryNode[];
      value: string;
      parentId: string | null;
    }> = [];

    let parentId: string | null = null;

    for (let level = 0; level < LEVEL_LABELS.length; level += 1) {
      const options = getCategoryChildren(parentId);
      if (options.length === 0) break;

      const value = selectedPath[level]?.id ?? '';
      levels.push({
        label: LEVEL_LABELS[level],
        options,
        value,
        parentId,
      });

      if (!value) break;
      parentId = value;
    }

    return levels;
  }, [selectedPath]);

  const categoryProductCounts = useMemo(() => {
    const counts = new Map<string, number>();

    products.forEach((product) => {
      getCategoryPath(product.categoryId).forEach((category) => {
        counts.set(category.id, (counts.get(category.id) ?? 0) + 1);
      });
    });

    return counts;
  }, [products]);

  const categoryProducts = useMemo(() => {
    if (!values.selectedCategoryId) return products;
    const allowed = new Set(getDescendantCategoryIds(values.selectedCategoryId));
    return products.filter((product) => allowed.has(product.categoryId));
  }, [products, values.selectedCategoryId]);

  const manufacturerOptions = useMemo(
    () =>
      Array.from(new Set(categoryProducts.map((product) => product.manufacturer)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [categoryProducts],
  );

  const manufacturerProducts = useMemo(
    () =>
      values.selectedManufacturer
        ? categoryProducts.filter(
            (product) => product.manufacturer === values.selectedManufacturer,
          )
        : categoryProducts,
    [categoryProducts, values.selectedManufacturer],
  );

  const applicationOptions = useMemo(
    () =>
      Array.from(new Set(manufacturerProducts.map((product) => product.application)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [manufacturerProducts],
  );

  const applicationProducts = useMemo(
    () =>
      values.selectedApplication
        ? manufacturerProducts.filter(
            (product) => product.application === values.selectedApplication,
          )
        : manufacturerProducts,
    [manufacturerProducts, values.selectedApplication],
  );

  const materialOptions = useMemo(
    () =>
      Array.from(new Set(applicationProducts.map((product) => product.material)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [applicationProducts],
  );

  useEffect(() => {
    if (
      values.selectedManufacturer &&
      !manufacturerOptions.includes(values.selectedManufacturer)
    ) {
      onChange({ selectedManufacturer: '' });
    }
  }, [manufacturerOptions, values.selectedManufacturer]);

  useEffect(() => {
    if (
      values.selectedApplication &&
      !applicationOptions.some(
        (application) => application === values.selectedApplication,
      )
    ) {
      onChange({ selectedApplication: '' });
    }
  }, [applicationOptions, values.selectedApplication]);

  useEffect(() => {
    if (
      values.selectedMaterial &&
      !materialOptions.some(
        (material) => material === values.selectedMaterial,
      )
    ) {
      onChange({ selectedMaterial: '' });
    }
  }, [materialOptions, values.selectedMaterial]);

  const hasActiveFilters = Boolean(
    values.selectedCategoryId ||
      values.selectedManufacturer ||
      values.selectedApplication ||
      values.selectedMaterial,
  );

  return (
    <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#00162c]">
          Filtro Avançado
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] font-semibold text-[#005cba] hover:underline cursor-pointer"
          >
            Limpar
          </button>
        )}
      </div>

      {selectedPath.length > 0 && (
        <div className="mb-3 rounded-lg bg-[#f8f9ff] border border-[#e5eeff] px-2.5 py-2">
          <span className="text-[9px] uppercase font-bold text-[#43474d] block">
            Caminho selecionado
          </span>
          <span className="text-[10px] font-semibold text-[#005cba] leading-relaxed">
            {selectedPath.map((category) => category.name).join(' › ')}
          </span>
        </div>
      )}

      <div className="space-y-2.5">
        {categoryLevels.map((level) => (
          <div key={`${level.label}-${level.parentId ?? 'root'}`}>
            <label className="text-[10px] font-bold uppercase text-[#43474d] block mb-1">
              {level.label}
            </label>
            <select
              value={level.value}
              onChange={(event) => {
                const value = event.target.value;
                onChange({
                  selectedCategoryId: value || level.parentId,
                });
              }}
              className={selectClassName}
            >
              <option value="">
                {level.parentId ? 'Todos os tipos' : 'Todas as categorias'}
              </option>
              {level.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name} ({categoryProductCounts.get(option.id) ?? 0})
                </option>
              ))}
            </select>
          </div>
        ))}

        <div>
          <label className="text-[10px] font-bold uppercase text-[#43474d] block mb-1">
            Fabricante
          </label>
          <select
            value={values.selectedManufacturer}
            onChange={(event) =>
              onChange({ selectedManufacturer: event.target.value })
            }
            className={selectClassName}
          >
            <option value="">Todos os fabricantes</option>
            {manufacturerOptions.map((manufacturer) => (
              <option key={manufacturer} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-[#43474d] block mb-1">
            Aplicação
          </label>
          <select
            value={values.selectedApplication}
            onChange={(event) =>
              onChange({ selectedApplication: event.target.value })
            }
            className={selectClassName}
          >
            <option value="">Todas as aplicações</option>
            {applicationOptions.map((application) => (
              <option key={application} value={application}>
                {application}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-[#43474d] block mb-1">
            Material
          </label>
          <select
            value={values.selectedMaterial}
            onChange={(event) =>
              onChange({ selectedMaterial: event.target.value })
            }
            className={selectClassName}
          >
            <option value="">Todos os materiais</option>
            {materialOptions.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-1.5 text-[10px] text-[#43474d] leading-relaxed">
        <span className="material-symbols-outlined text-[13px] text-[#005cba]">
          filter_alt
        </span>
        <span>
          As opções seguintes são atualizadas conforme a escolha anterior.
        </span>
      </div>
    </div>
  );
};
