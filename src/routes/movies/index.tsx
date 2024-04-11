import { Col, Flex, Input, InputNumber, Row, Select, Table } from "antd";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { debounce } from "remeda";
import { Omdb, Search } from "../../types/Omdb.ts";
import { useCallback, useMemo } from "react";
import { options, paginationConfig, tableColumnConfig } from "./config.tsx";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movies = useLoaderData() as Omdb | undefined;

  const handleFilterChange = useCallback(
    (name: string, value: string) => {
      setSearchParams((prev) => {
        const searchParams = new URLSearchParams(prev);
        searchParams.set(name, value);
        searchParams.delete("page");
        return searchParams.toString();
      });
    },
    [setSearchParams],
  );

  const debouncer = debounce(handleFilterChange, { waitMs: 500 });

  const pagination = useMemo(
    () => paginationConfig(movies, searchParams),
    [movies, searchParams],
  );
  const columns = useMemo(() => tableColumnConfig, []);

  const selectDefaultOption = options.find(
    (item) => item.value === searchParams.get("type"),
  );

  return (
    <Flex vertical gap="large">
      <h1 className="text-4xl font-bold">OMDB Publishings</h1>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col span={8}>
          <Input.Search
            size="large"
            placeholder="Search for a publishing"
            defaultValue={searchParams.get("s") || ""}
            loading={!movies}
            onChange={(e) => {
              debouncer.call("s", e.currentTarget.value || "");
            }}
            autoFocus
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="large"
            placeholder="Search a release year"
            defaultValue={searchParams.get("y") || ""}
            onChange={(e) => {
              debouncer.call("y", e ? e.toString() : "");
            }}
            className="w-full"
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Select a type"
            className="w-full"
            size="large"
            allowClear
            defaultValue={selectDefaultOption}
            onChange={(e) => {
              debouncer.call("type", (e as unknown as string) || "");
            }}
            options={options}
          />
        </Col>
      </Row>
      <Table<Search>
        rowKey="imdbID"
        dataSource={movies?.Search}
        columns={columns}
        bordered
        loading={!movies}
        pagination={pagination}
        onChange={(pagination) =>
          setSearchParams(() => {
            searchParams.set("page", pagination.current?.toString() || "");
            return searchParams.toString();
          })
        }
      />
    </Flex>
  );
}
