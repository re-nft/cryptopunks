import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import PunkContext from '../../contexts/punk';
import useComponentVisible from '../../hooks/useComponentVisible';
import { getTenant } from '../../utils';

// import { Transition } from '@headlessui/react';

const TableRow = ({ address, start, end }) => {
  const isActive = Math.round(Date.now() / 1000) < end;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=rTddenoJ81&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
              alt="girl"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-500">{address}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {String(new Date(start * 1000))}
        </div>
        <div className="text-sm text-gray-500">
          {String(new Date(end * 1000))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            isActive ? 'bg-green-100' : 'bg-red-100'
          } text-green-800`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  address: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired
}

export default function ModalCard({ children }) {
  const { activePunk, setActivePunk } = useContext(PunkContext);
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  if (activePunk) {
    console.log(getTenant(activePunk));
  }

  useEffect(() => {
    if (!isComponentVisible) {
      setActivePunk(null);
    }
  }, [isComponentVisible, setActivePunk]);

  return (
    <>
      <div>
        {isComponentVisible && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              ></span>
              <div
                ref={ref}
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all md:my-8 sm:align-middle md:w-5/6 md:p-6"
              >
                <div>
                  <>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Punk #{activePunk.id}
                        </h3>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Current Owner
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {activePunk.owner}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Tenant
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {activePunk
                                ? getTenant(activePunk).tenant
                                : 'none'}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-rows-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Tenancy Provenance
                            </dt>
                            <dd className="text-sm text-gray-900 sm:mt-0 sm:row-span-3">
                              <>
                                <div className="flex flex-col">
                                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                              >
                                                Tenant Address
                                              </th>
                                              <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                              >
                                                Dates active
                                              </th>
                                              <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                              >
                                                Status
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                            {activePunk &&
                                              activePunk.provenance.length !==
                                                0 &&
                                              activePunk.provenance.map((p) => (
                                                <TableRow
                                                  key={`${p.tenant}::${p.tenancyDates.start}::${p.tenancyDates.end}`}
                                                  address={p.tenant}
                                                  start={p.tenancyDates.start}
                                                  end={p.tenancyDates.end}
                                                />
                                              ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </>
                  {/* TODO: only show if owner */}
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Gift Tenant Rights
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {children(setIsComponentVisible)}
    </>
  );
}

ModalCard.propTypes = {
  children: PropTypes.func.isRequired,
};
