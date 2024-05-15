import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp, FaSistrix, FaTimes } from 'react-icons/fa';
import { makeBlur } from '@/utils';
import IconButton from '@/components/IconButton';
import Input from '@/components/Input';
import { AriaLabels, FormTypes, IconBtnType, IconSizes, InputTypes, SearchParamsKeys, SortTypes } from '@/constants';
import { FilterContainer, ButtonsList, Item } from './Filter.styled';
import useSetSearchParams from '@/hooks/useSetSearchParams';

const Filter = () => {
  const { searchParams, updateSearchParams, setSearchParams } = useSetSearchParams();
  const filter = searchParams.get(SearchParamsKeys.FILTER_SP_KEY) ?? '';
  const [showFilter, setShowFilter] = useState<boolean>(() => Boolean(filter));
  const descSortType = searchParams.get(SearchParamsKeys.SORT_SP_KEY) === SortTypes.DESC_SORT_TYPE;
  const clearFilterBtnIcon = Boolean(filter) && <FaTimes size={IconSizes.primaryIconSize} />;
  const sortBtnIcon = descSortType ? (
    <FaSortAlphaDown size={IconSizes.primaryIconSize} />
  ) : (
    <FaSortAlphaUp size={IconSizes.primaryIconSize} />
  );

  useEffect(() => {
    if (!showFilter) {
      searchParams.delete(SearchParamsKeys.FILTER_SP_KEY);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, showFilter]);

  const onSortBtnClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    makeBlur(currentTarget);
    const value = descSortType ? SortTypes.ASC_SORT_TYPE : SortTypes.DESC_SORT_TYPE;
    updateSearchParams({ key: SearchParamsKeys.SORT_SP_KEY, value });
  };

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateSearchParams({ key: SearchParamsKeys.FILTER_SP_KEY, value });
  };

  const onFilterBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    makeBlur(e.currentTarget);
    setShowFilter((showFilter) => !showFilter);
  };

  const onClearFilterBtnClick = () => {
    updateSearchParams({ key: SearchParamsKeys.FILTER_SP_KEY });
  };

  return (
    <FilterContainer>
      {showFilter && (
        <Input
          type={InputTypes.text}
          value={filter}
          onChange={onFilterChange}
          formType={FormTypes.filter}
          autoFocus
          inputWrap
          btnIcon={clearFilterBtnIcon}
          btnType={IconBtnType.clearFilter}
          action={onClearFilterBtnClick}
        />
      )}
      <ButtonsList>
        <Item>
          <IconButton
            btnType={IconBtnType.filter}
            onBtnClick={onFilterBtnClick}
            aria-label={AriaLabels.filter}
            icon={<FaSistrix size={IconSizes.otherIconSize} />}
          />
        </Item>
        <Item>
          <IconButton
            btnType={IconBtnType.filter}
            onBtnClick={onSortBtnClick}
            aria-label={AriaLabels.sort}
            icon={sortBtnIcon}
          />
        </Item>
      </ButtonsList>
    </FilterContainer>
  );
};

export default Filter;
